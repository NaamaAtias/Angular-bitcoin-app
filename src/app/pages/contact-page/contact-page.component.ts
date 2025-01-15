import { Component, inject , Output , EventEmitter} from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { DestroyRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-page',
  standalone: false,
  
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  private ContactService = inject(ContactService)
  // private destroyRef = inject(DestroyRef)
  contacts$ = this.ContactService.contacts$
  @Output() moveToDetails = new EventEmitter<string>()
  router=inject(Router)
  
  
  addContact() {
    this.router.navigateByUrl('/contact/edit')
  }

}
