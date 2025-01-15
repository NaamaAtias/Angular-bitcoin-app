import { Component , inject, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'contact-details-page',
  standalone: false,
  
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent {
  //Without Resolver://
  // @Input() contactId!:string
  // contact$!: Observable<Contact> 


  //With Resolver://
  contactService=inject(ContactService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  contact$: Observable<Contact> = this.route.data.pipe(
    tap ((data) => console.log(data)),
    map(data => data['contact'])
  )



  ngOnInit() {
    
    //Without Resolver://

    // this.contact$ = this.route.params.pipe(
    //   switchMap(params => this.contactService.getContactById(params['contactId'])),
    //   tap(params => console.log(params))
    // )

  //   this.contactService.getContactById(this.contactId)
  //       .pipe (
  //         tap (res => console.log(res)),
  //         tap (res => {this.contact = res as Contact})
  //       )
  //       .subscribe()
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

}
