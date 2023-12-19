import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.scss']
})
export class AppAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  deconnexion(){
    localStorage.clear();
    this.router.navigateByUrl("/")
  }

}
