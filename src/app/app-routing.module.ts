import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { PayementComponent } from './admin/payement/payement.component';
import { AvanceComponent } from './admin/avance/avance.component';
import { PosteComponent } from './admin/poste/poste.component';
import { ContratComponent } from './admin/contrat/contrat.component';
import { PersonnelComponent } from './admin/personnel/personnel.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { CongeComponent } from './admin/conge/conge.component';
import { MonGuard } from './guard/mon.guard';
import { UpdateEmployeComponent } from './admin/update-employe/update-employe.component';
import { AbsenceComponent } from './admin/absence/absence.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: ConnexionComponent },
  { path: 'admin', component: AppAdminComponent,canActivate:[MonGuard], children: [
    { path: 'dasboard', component: DasboardComponent },
    { path: 'payement', component: PayementComponent },
    { path: 'avance', component: AvanceComponent },
    { path: 'poste', component: PosteComponent },
    { path: 'contrant', component: ContratComponent },
    { path: 'personnel', component: PersonnelComponent },
    { path: 'conge', component: CongeComponent },
    { path: 'update/:id', component: UpdateEmployeComponent },
    {path:'absence',component:AbsenceComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
