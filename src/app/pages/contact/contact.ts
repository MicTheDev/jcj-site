import { Component, signal } from '@angular/core';
import emailjs from '@emailjs/browser';

// From the EmailJS dashboard (emailjs.com) — Email Services / Email Templates / Account > API Keys.
// These IDs are meant to be public/client-side; access is restricted via the dashboard's domain allowlist.
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly formNote = signal('');
  protected readonly sending = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    this.sending.set(true);
    this.formNote.set('Sending…');

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        this.formNote.set('Thank you — your message has been sent.');
        form.reset();
      })
      .catch(() => {
        this.formNote.set(
          "Something went wrong sending your message. Please try again or email me directly."
        );
      })
      .finally(() => this.sending.set(false));
  }
}
