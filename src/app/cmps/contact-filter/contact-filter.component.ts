import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import { ContactFilter } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-filter',
  standalone: false,
  
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent {

  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)
  filterSubject$ = new Subject()

  filterBy!: ContactFilter

  ngOnInit(): void {
      this.contactService.filterBy$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(filterBy => {
              this.filterBy = filterBy
          })

      this.filterSubject$
          .pipe(
              debounceTime(500),
              distinctUntilChanged()
          )
          .subscribe(
              () => this.contactService.setFilterBy(this.filterBy)
          )
  }

  onSetFilterBy(value: string) {
      this.filterSubject$.next(value)
  }
}
