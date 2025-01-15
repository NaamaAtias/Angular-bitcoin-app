import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { contactResolver } from './resolvers/contact.resolver';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {
    path: "contact", component: ContactPageComponent, children: 
    [
    {
      path: "edit", 
      component: ContactEditComponent
    },
    {
      path: "edit/:contactId", 
      component: ContactEditComponent, 
      resolve: {contact: contactResolver} 
    }
  ]
  },
  {
    path: "contact/:contactId", 
    component: ContactDetailsPageComponent,
    resolve: {contact: contactResolver} 
  },
  {path: "statistic", component: StatisticPageComponent},
  {path: "", pathMatch:'full' ,redirectTo: 'home'},
  {path: "**", redirectTo: 'home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
