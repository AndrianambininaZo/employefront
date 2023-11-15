import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { TestComponent } from './test/test.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { PersonnelComponent } from './admin/personnel/personnel.component';
import { PayementComponent } from './admin/payement/payement.component';
import { PosteComponent } from './admin/poste/poste.component';
import { ContratComponent } from './admin/contrat/contrat.component';
import { AvanceComponent } from './admin/avance/avance.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CongeComponent } from './admin/conge/conge.component';
import { UpdateEmployeComponent } from './admin/update-employe/update-employe.component';
import { AbsenceComponent } from './admin/absence/absence.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AppAdminComponent,
    DasboardComponent,
    PersonnelComponent,
    PayementComponent,
    PosteComponent,
    ContratComponent,
    AvanceComponent,
    ConnexionComponent,
    CongeComponent,
    UpdateEmployeComponent,
    AbsenceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    CarouselModule,
    NgxPaginationModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
