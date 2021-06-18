import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';


const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'list'},
  { path: 'list', component: CustomerListComponent},
  { path: 'details/:id', component: CustomerDetailsComponent},
  { path: 'create', component: CustomerCreateComponent},
  { path: 'update', component: CustomerUpdateComponent},
  { path: 'update/:id', component: CustomerUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
