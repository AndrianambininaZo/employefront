import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutheService {
  authentifie:boolean=false

  constructor() { }

  loadProfile(idUser:string){
    localStorage.setItem("jwt-token",idUser);
    this.authentifie=true
  }

  getStorage():boolean{
    let data=localStorage.getItem("jwt-token")
    if(data){   
      this.loadProfile(data);   
      return true;
    }
    else{
      return false;
    }
  }
}
