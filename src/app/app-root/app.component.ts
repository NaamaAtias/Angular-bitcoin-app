import { Component, inject, OnInit,OnDestroy } from '@angular/core';
//import { Input } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bitcoin-app';
  private ContactService = inject(ContactService);
  private subscription!:Subscription

  currentPage: string = 'home-page'; 

  contactId : string = ""

  ngOnInit() : void {
    this.subscription=this.ContactService.loadContacts().subscribe ({
      error(error) {
        console.log(error)
      }
    })
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe()
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  moveToDetails(id : string) {
    this.contactId=id
    this.changePage('contact-details-page')
  }
 

}
