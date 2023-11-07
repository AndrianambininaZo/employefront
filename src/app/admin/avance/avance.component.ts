import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avance, AvanceEmploye, Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.scss']
})
export class AvanceComponent implements OnInit {

  annees: number[] = [];
  mois: { id: number, mois: string }[] = [];
  formAvance!:FormGroup;
  listPersonnel!:Array<Personnel>;
  isAvance:string="";
  isModal:boolean=false;
  listAvance!:Array<AvanceEmploye>;
  
  totalPageItems: any;
  page: number = 1;
  constructor(private fb:FormBuilder,private service:AdminService) {
    this.getListAnnees()
    this.getMois()
   }

  ngOnInit(): void {
    this.formAvance=this.fb.group({
      mois:this.fb.control("",[Validators.required]),
    annee:this.fb.control("",[Validators.required]), 
    montant:this.fb.control("",[Validators.required]),
    EmployesId:this.fb.control("",[Validators.required]),
    motif: this.fb.control("",[Validators.required]),    
    });
    this.getList();
    this.getListeAvance();
  }
  getListAnnees() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.annees.push(currentYear - i);
    }
  }
  getMois() {
    const moisNom = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    for (let i = 0; i < moisNom.length; i++) {
      this.mois.push({ id: i + 1, mois: moisNom[i] });
    }
  }

  getList(){
    this.service.getListPersonnel().subscribe({
      next:(data)=>{
        this.listPersonnel=data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  enregistrerAvance(){
   let avance=new Avance();
   avance=this.formAvance.value 
   this.service.createAvance(avance).subscribe({
    next:(data)=>{
      this.isAvance="";
      this.formAvance.reset(0)
      this.isModal=false
      this.getListeAvance()
    },error:(err)=>{
      if (err.status == 500) {
        this.isAvance="L'employeur deja fait une avance dans ce mois ici!"       
      }
    }
   })    
  }
  openModal(){
    this.isModal=!this.isModal
  }
  annullerAvance(){
    this.formAvance.reset(0);
    this.isModal=!this.isModal
  }


  getListeAvance(){
    this.service.getListeAvance().subscribe({
      next:(data)=>{
        this.listAvance=data
        console.log(data)
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
