import { Component } from '@angular/core';
import { AutheService } from './service/authe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eshoptsika';
  constructor(private authService: AutheService) { }
  ngOnInit(): void {
    this.authService.getStorage();
  }
}
