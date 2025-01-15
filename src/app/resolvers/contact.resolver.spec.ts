import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { contactResolver } from './contact.resolver';
import { Contact } from '../models/contact.model';

describe('contactResolver', () => {
  const executeResolver: ResolveFn<Contact> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => contactResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
