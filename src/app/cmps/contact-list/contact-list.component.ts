import { Component, Input , Output , EventEmitter} from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @Input() contacts : Contact[] | null = null
  @Output() moveToDetails = new EventEmitter<string>()

}
