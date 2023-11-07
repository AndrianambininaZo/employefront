import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutheService } from '../service/authe.service';

@Injectable({
  providedIn: 'root'
})
export class MonGuard implements CanActivate {
  constructor(private router: Router,private authService:AutheService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const utilisateur_authentifie=this.authService.authentifie
      if (utilisateur_authentifie) {
        return true; // Autoriser l'accès à la route
      } else {
        this.router.navigate(['/']); // Rediriger vers la page de connexion
        return false; // Interdire l'accès à la route
      }
  }
  
}
