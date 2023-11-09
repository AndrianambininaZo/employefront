import { Component, OnInit } from '@angular/core';
import { Payement, PayementEmploye, Personnel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  sumPayement!:number;
  sumAvance!:number
  personnel!:number
  listPersonnel!:Array<Personnel>
  conge!:number
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.getList();
    this.getListePersonnel()
    this.getListeAvance();
    this.getListConge()
  }
 getList(){
  this.service.getListePayement().subscribe({
    next:(data)=>{
      this.sumPayement=data.reduce((debut,fin)=>  debut + fin.totalMontant!,0)
    },error:(err)=>{
      console.log(err);
    }
  })
 }
 getListeAvance(){
  this.service.getListeAvance().subscribe({
    next:(data)=>{
      this.sumAvance=data.reduce((init,sum)=> init + sum.montant!,0)
    },error:(err)=>{
      console.log(err);
    }
  })
}
getListePersonnel(){
  this.service.getListPersonnel().subscribe({
    next:(data)=>{
      this.personnel=data.length
      this.listPersonnel=data.slice(-3);
    },error:(err)=>{
      console.log(err);
    }
  })
}



getListConge(){
  this.service.getListeContrant().subscribe({
    next:(data)=>{
      this.conge=data.length
    },error:(err)=>{
      console.log(err)
    }
  })
}

}
