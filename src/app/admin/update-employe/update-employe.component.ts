import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.scss']
})
export class UpdateEmployeComponent implements OnInit {

  formPersonnel!:FormGroup;
  isFom:boolean=false;
  listPersonnel!:Array<Personnel>;
  idEmployer!:number;
  employe!:Personnel

  constructor(private route: ActivatedRoute,private router:Router,private fb:FormBuilder,private service:AdminService) { }

  ngOnInit(): void {
    this.formPersonnel=this.fb.group({
      nom:this.fb.control("",[Validators.required,Validators.min(3)]),
      prenom:this.fb.control("",[Validators.required]),
      matricule:this.fb.control("",[Validators.required]),
      dateNaissance:this.fb.control("",[Validators.required]),
      cin:this.fb.control("",[Validators.required,Validators.min(12)]),
      email:this.fb.control("",[Validators.email,Validators.required])
    });

    this.paccherForm();
  }
  paccherForm(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.idEmployer = +params.get('id')!;
        return this.service.getEmploye(this.idEmployer);
      })
    ).subscribe({
      next:(data) => {
        this.employe = data;
        if (this.employe) {                      
          this.formPersonnel.patchValue(this.employe);
        }
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  modifier(){
    if (this.formPersonnel.valid) {
      let employe=new Personnel();
      employe=this.formPersonnel.value
      this.service.updatePersonnel(employe,this.idEmployer).subscribe({
        next:(data)=>{
          this.router.navigateByUrl("/admin/personnel");
          this.formPersonnel.reset(0);
        },error:(err)=>{
          console.log(err);
        }
      })
    }
  }
  
  annullerForm(){
    this.formPersonnel.reset(0);
    this.router.navigateByUrl("/admin/personnel");
  }

}
