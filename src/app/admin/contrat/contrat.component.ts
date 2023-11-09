import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat, ContratRequest, Personnel, Poste } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  formContrat!:FormGroup;
  listPersonnel!:Array<Personnel>;
  listPoste!:Array<Poste>;
  listContrat!:Array<Contrat>;
  totalPageItems: any;
  page: number = 1;

  constructor(private fb:FormBuilder,private service:AdminService) { }

  ngOnInit(): void {
    this.formContrat=this.fb.group({
      montant:this.fb.control("",[Validators.required]),
      debut:this.fb.control("",[Validators.required]),
      fin:this.fb.control("",[Validators.required]),
      posteId:this.fb.control("",[Validators.required]),
      personnelId:this.fb.control("",[Validators.required]),     
    });
    this.getListeContrat()
    this.getListPersonnel();
    this.getListePoste();
    ;
  }

  getListeContrat(){
    this.service.getListeContrant().subscribe({
      next:(data)=>{
        this.listContrat=data
        console.log(data)
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  enregistrerContrat(){   
    if (this.formContrat.valid) {
      let contrat=new ContratRequest();
      contrat=this.formContrat.value
      this.service.creerContrant(contrat).subscribe({
        next:(data)=>{
          this.getListeContrat();
          this.annuller()
        },error:(err)=>{
          console.log(err);
        }
      })
      
    }

  }  
  getListPersonnel(){
    this.service.getListPersonnel().subscribe({
      next:(data)=>{
        this.listPersonnel=data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getListePoste(){
    this.service.getListePoste().subscribe({
      next:(data)=>{
        this.listPoste=data
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  annuller(){
    this.formContrat.reset(0)
  }

}
