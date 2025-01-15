import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-preview',
  standalone: false,
  
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})
export class ContactPreviewComponent {
  @Input() contact!: Contact 
  //@Output() moveToDetails = new EventEmitter<string>()
  router = inject(Router)


}
