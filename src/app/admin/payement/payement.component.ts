import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payement, PayementEmploye, Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit {
  annees: number[] = [];
  mois: { id: number, mois: string }[] = [];
  listPersonnel!:Array<Personnel>;
  formPayement!:FormGroup;
  listPayement!:Array<PayementEmploye>
  isModal:boolean=false;
  totalPageItems: any;
  page: number = 1;
  isPayement=""
  constructor(private service:AdminService,private fb:FormBuilder) {
    this.getListAnnees()
    this.getMois()
   }

  ngOnInit(): void {
    this.formPayement=this.fb.group({
      mois:this.fb.control("",[Validators.required]),
    annee:this.fb.control("",[Validators.required]), 
    montant:this.fb.control("",[Validators.required]),
    EmployesId:this.fb.control("",[Validators.required]), 
    });
    this.getList()
    this.getListPayement();
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

  enregistrerPayement(){
    let payement=new Payement(); 
   payement= this.formPayement.value;
   this.service.createPayement(payement).subscribe({
    next:(data)=>{ 
      this.formPayement.reset(0);
      this.isModal=false  
      this.getListPayement(); 
      this.isPayement=""; 
    },error:(err)=>{
      if(err.status==500){
        this.isPayement="Le payement deja effectuer";
      }
    }
   })  
  }

  openModal(){
    this.isModal=!this.isModal
  }
  fermerModal(){
    this.isModal=!this.isModal
    this.formPayement.reset(0);
  }

  getListPayement(){
    this.service.getListePayement().subscribe({
      next:(data)=>{
        this.listPayement=data
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
