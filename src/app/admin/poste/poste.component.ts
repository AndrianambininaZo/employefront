import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Poste } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {
  formPoste!:FormGroup;
  listPoste!:Array<Poste>;
  totalPageItems: any;
  page: number = 1;
  constructor(private fb:FormBuilder,private service:AdminService) { }

  ngOnInit(): void {
    this.formPoste=this.fb.group({
      nom:this.fb.control("",[Validators.required]),
      description:this.fb.control("",[Validators.required]),    
    });
    this.getListePoste()
  }
  enregistrerPoste(){  
    if (this.formPoste.valid) {   
      let poste=new Poste();
      poste= this.formPoste.value
      this.service.creerPoste(poste).subscribe({
        next:(data)=>{
          this.getListePoste()
          this.annuller()
        },error:(err)=>{
          console.log(err);
        }
      })
    }  
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
    this.formPoste.reset(0)
  }

}
