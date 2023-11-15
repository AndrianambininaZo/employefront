import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence, Personnel, absenceRequest } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {

  formAbsence!:FormGroup;
  listPersonnel!:Array<Personnel>;
  listAbsence!:Array<Absence>;
  totalPageItems: any;
  page: number = 1;

  constructor(private fb:FormBuilder,private service:AdminService) { }

  ngOnInit(): void {
    this.formAbsence=this.fb.group({
      date:this.fb.control("",[Validators.required]),  
      EmployesId:this.fb.control("",[Validators.required])
    });
    this.getListPersonnel();
    this.getListAbsence()
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

  handleAbence(){
    if(this.formAbsence.valid){
      let absence=new absenceRequest();
      absence=this.formAbsence.value
      this.service.createAbsence(absence).subscribe({
        next:(data)=>{
          this.formAbsence.reset(0)
          this.getListAbsence()
        },error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  getListAbsence(){
    this.service.getListeAbsence().subscribe({
      next:(data)=>{
        console.log(data)
        this.listAbsence=data
      },error:(err)=>{
        console.log(err);
      }
    });

  }
}
