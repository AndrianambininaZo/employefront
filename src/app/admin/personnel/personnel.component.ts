import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  formPersonnel!:FormGroup;
  isFom:boolean=false;
  listPersonnel!:Array<Personnel>;
  totalPageItems: any;
  page: number = 1;
  inputRechercher!:string
  constructor(private fb:FormBuilder,private service:AdminService,private route:Router) { }

  ngOnInit(): void {
    this.formPersonnel=this.fb.group({
      nom:this.fb.control("",[Validators.required,Validators.min(3)]),
      prenom:this.fb.control("",[Validators.required]),
      matricule:this.fb.control("",[Validators.required]),
      dateNaissance:this.fb.control("",[Validators.required]),
      cin:this.fb.control("",[Validators.required,Validators.min(12)]),
      email:this.fb.control("",[Validators.email])
    });
    this.getList();
  }

  enregistrerPesonnel(){    
    let personnel=new Personnel();
    if (this.formPersonnel.valid) {
      personnel=this.formPersonnel.value
      this.service.creerPersonnel(personnel).subscribe({
        next:(data)=>{
          this.getList();
          this.annullerForm();
        },error:(err)=>{
          console.log(err);
        }
      })
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

  isNouveau(){
    this.isFom=!this.isFom
  }

  annullerForm(){
    this.formPersonnel.reset(0);
    this.isFom=!this.isFom
  }
  modifier(id:number){
    this.route.navigateByUrl("/admin/update/"+id)
  }
  supprimer(id:number){
    this.service.deletPersonnel(id).subscribe({
      next:(data)=>{
        console.log(data);
        this.getList();
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  recherche(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputRechercher = value
    this.service.getListPersonnel().subscribe({
      next:(data)=>{
        this.listPersonnel=data.filter((res)=>{
          return res.nom?.toLowerCase().includes(this.inputRechercher.toLowerCase());
         });
      },error:(err)=>{
        console.log(err);
      }
    });   
  }

}
