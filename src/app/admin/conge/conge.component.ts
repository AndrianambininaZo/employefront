import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conge, CongeEmploye, Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  constructor(private service:AdminService,private fb:FormBuilder) { }
  totalPageItems: any;
  page: number = 1;
  listPersonnel!:Array<Personnel>;
  formConge!:FormGroup;
  congeList!:Array<CongeEmploye>

  ngOnInit(): void {
    this.formConge=this.fb.group({
      dateFin:this.fb.control("",[Validators.required]),
      dateDebut:this.fb.control("",[Validators.required]), 
      motif:this.fb.control("",[Validators.required]),
      EmployesId:this.fb.control("",[Validators.required]), 
    });
    this.getListPerson();
    this.getListConge();

  }

  getListPerson(){
    this.service.getListPersonnel().subscribe({
      next:(data)=>{
        this.listPersonnel=data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  annuller(){
    this.formConge.reset(0)
  }

  enregistrerConge(){
    if (this.formConge.valid) {
      let conge=new Conge();
      conge= this.formConge.value   
      this.service.createConge(conge).subscribe({
        next:(data)=>{
          this.formConge.reset(0)
          this.getListConge()
        },error:(err)=>{
          console.log(err)
        }
      })
    }    
  }
  getListConge(){
    this.service.getListeConge().subscribe({
      next:(data)=>{
        this.congeList=data
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
