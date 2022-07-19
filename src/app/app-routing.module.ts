import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenesComponent } from './genes/genes.component';
import { GeneDetailComponent } from './gene-detail/gene-detail.component';

const routes: Routes = [
  { path: 'genes', component: GenesComponent },
  { path: 'detail/:id', component: GeneDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }