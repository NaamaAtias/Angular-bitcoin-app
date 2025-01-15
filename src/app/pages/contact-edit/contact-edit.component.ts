import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, map, Observable, filter} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit{
  contactService= inject(ContactService)
  contact = this.contactService.getEmptyContact()
  router= inject(Router)
  route= inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.route.data
    .pipe(
      tap(data => console.log(data['contact'])),
      map(data => data['contact']),
      filter(contact => !!contact),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(contact => {
        this.contact = contact
      })
  }

  onSaveContact(){
    this.contactService.saveContact(this.contact as Contact)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({ 
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('/contact')
    })
  }

  onRemoveContact() {
    if (!!this.contact._id) {
    this.contactService.deleteContact(this.contact._id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({ 
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('/contact')
    })
  }
  //else this.router.navigateByUrl('/contact')

  }

  goBack() {
    this.router.navigateByUrl('/contact')
  }
}
