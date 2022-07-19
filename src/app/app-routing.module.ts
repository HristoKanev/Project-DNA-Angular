import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenesComponent } from './genes/genes.component';

const routes: Routes = [
  { path: 'genes', component: GenesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }