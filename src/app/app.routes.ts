import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Story } from './pages/story/story';
import { Collection } from './pages/collection/collection';
import { News } from './pages/news/news';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Johnnie C. Johnson Jr.' },
  { path: 'story', component: Story, title: 'The Story — Johnnie C. Johnson Jr.' },
  { path: 'collection', component: Collection, title: 'The Collection — Johnnie C. Johnson Jr.' },
  { path: 'news', component: News, title: 'News — Johnnie C. Johnson Jr.' },
  { path: 'contact', component: Contact, title: 'Contact — Johnnie C. Johnson Jr.' },
  { path: '**', redirectTo: '' },
];
