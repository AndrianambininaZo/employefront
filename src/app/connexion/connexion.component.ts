import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheService } from '../service/authe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AutheService,private router:Router) { }
  formConnexion!:FormGroup;

  ngOnInit(): void {
    this.formConnexion=this.fb.group({
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required]),
    })

  }
  connexion(){
    //admin@gmail.com
    const token="$Xr6z3z9OQ4s1BF6u8BlKc.DWxQr18K1axE"
    if (this.formConnexion.valid) {
      if (this.formConnexion.controls['email'].value=="admin@gmail.com" && this.formConnexion.controls['password'].value=="motdepass") {
        this.authService.loadProfile(token);
        this.router.navigateByUrl("/admin/dasboard")         
      } else{
        alert("Invalide password ou mot depasse")
      }    
    }
  }

}
