import { Component, ElementRef, WritableSignal, afterNextRender, signal } from '@angular/core';

interface CollectionDetail {
  label: string;
  value: string;
}

interface CollectionItem {
  tag: string;
  title: string;
  meta: string;
  synopsis: string;
  image: string;
  imageAlt: string;
  details: CollectionDetail[];
  link?: string;
  linkLabel?: string;
}

interface ScreenplayItem {
  title: string;
  genre: string;
}

@Component({
  selector: 'app-collection',
  imports: [],
  templateUrl: './collection.html',
})
export class Collection {
  protected readonly items: CollectionItem[] = [
    {
      tag: 'Stage Play',
      title: 'A Princess in the Ghetto',
      meta: 'Urban Drama · Live Stage Production',
      synopsis: 'It explores the journey of a young girl named Monique who preserves her dreams, identity, and creative ambitions while navigating the cycles of the inner city.',
      image: '/images/Princess/princess.png',
      imageAlt: 'A Princess in the Ghetto stage play artwork',
      details: [
        { label: 'Director', value: 'Iv Amenti' },
        { label: 'Venue', value: 'The Black Academy of Arts and Letters, Dallas, TX' },
      ],
    },
    {
      tag: 'TV Movie',
      title: "She's Not Our Sister",
      meta: 'Family Drama · 2011 · IMDb 6.2',
      synopsis: "She's Not Our Sister - A family drama, first produced as a hit stage play and later shot as a film, reveals secrets that were never meant to be taken to grave. Drama, light comedy.",
      image: '/images/NotOurSisterMovie/NotOurSisterMovie.JPG',
      imageAlt: "She's Not Our Sister film poster",
      details: [
        { label: 'Starring', value: 'Kellita Smith, Christian Keyes, Drew Sidora, Jazsmin Lewis' },
        { label: 'Also Starring', value: 'Clifton Powell, Azur-De Johnson, Tony Grant' },
        { label: 'Status', value: 'Streaming' },
      ],
      link: 'https://www.imdb.com/title/tt1976607/',
      linkLabel: 'View on IMDb',
    },
    {
      tag: 'Mini-Series',
      title: "She's Still Not Our Sister",
      meta: 'Drama · 2011 · 4-Part Mini Series',
      synopsis: "She's Still Not Our Sister - A 4-part mini series, based on the success of She's Not Our Sister, takes a look inside the lives of the Walker sisters after they learn the terms of their late father's will. Drama, light comedy.",
      image: '/images/NotOurSisterTV/NotOutSisterTV.JPG',
      imageAlt: "She's Still Not Our Sister mini-series poster",
      details: [
        { label: 'Starring', value: 'Kellita Smith, Christian Keyes, Drew Sidora' },
        { label: 'Also Starring', value: 'Jackée Harry, Clifton Powell, Azur-De Johnson' },
        { label: 'Status', value: 'Streaming' },
      ],
      link: 'https://www.imdb.com/title/tt2123667/',
      linkLabel: 'View on IMDb',
    },
    {
      tag: 'Feature Film',
      title: 'The Love You Save',
      meta: 'Family Drama · 2011 · 1h 30min · IMDb 6.4',
      synopsis: "Alexis is a successful single mother who has it all - except happiness. When a down and out stranger enters her family's world, a secret is revealed that will change all of their lives.",
      image: '/images/LoveYouSave/LoveYouSave.JPG',
      imageAlt: 'The Love You Save film poster',
      details: [
        { label: 'Starring', value: 'Robin Givens, Christopher Williams, Kierra "Kiki" Sheard' },
        { label: 'Also Starring', value: 'Denyce Lawton, Sean Riggs' },
        { label: 'Status', value: 'Streaming' },
      ],
      link: 'https://www.imdb.com/title/tt2050643/',
      linkLabel: 'View on IMDb',
    },
    {
      tag: 'Manuscript',
      title: 'Love in a Bottle',
      meta: 'Romantic Comedy',
      synopsis: 'Bridgette has finally found the man of her dreams. But to keep him, it comes with a price.',
      image: '/images/LoveInABottle/LoveInBottleA.PNG',
      imageAlt: 'Love in a Bottle cover art',
      details: [],
    },
  ];

  protected readonly screenplays: ScreenplayItem[] = [
    { title: 'In Love With a Killer', genre: 'Light Comedy · Turns Dark' },
    { title: 'If I Never See Forever', genre: 'Family Drama' },
    { title: 'Match My Love', genre: 'Drama · Romance' },
    { title: 'In the Meantime', genre: 'Drama' },
    { title: 'A Jones Family Affair', genre: 'Psychological Drama' },
    { title: 'Blood on the Altar', genre: 'Whodunit · Murder Drama' },
    { title: 'SugaWoman Part Un', genre: 'Light Dramedy' },
    { title: 'SugaWoman Part Deux', genre: 'Light Dramedy' },
    { title: 'SugaWoman Part Trois', genre: 'Light Dramedy' },
  ];

  protected readonly expanded = signal<ReadonlySet<number>>(new Set());
  protected readonly visibleRows = signal<ReadonlySet<number>>(new Set());
  protected readonly visibleCards = signal<ReadonlySet<number>>(new Set());

  constructor(private readonly host: ElementRef<HTMLElement>) {
    afterNextRender(() => this.observeReveal());
  }

  protected toggleDetails(index: number): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  protected isExpanded(index: number): boolean {
    return this.expanded().has(index);
  }

  private observeReveal(): void {
    this.watchReveal('.collection-row', this.visibleRows);
    this.watchReveal('.screenplay-card', this.visibleCards);
  }

  private watchReveal(selector: string, target: WritableSignal<ReadonlySet<number>>): void {
    const elements = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(
      (entries) => {
        const revealed = entries.filter((entry) => entry.isIntersecting).map((entry) => elements.indexOf(entry.target as HTMLElement));
        if (!revealed.length) return;

        target.update((current) => {
          const next = new Set(current);
          revealed.forEach((index) => next.add(index));
          return next;
        });

        entries.forEach((entry) => {
          if (entry.isIntersecting) observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    elements.forEach((element) => observer.observe(element));
  }
}
