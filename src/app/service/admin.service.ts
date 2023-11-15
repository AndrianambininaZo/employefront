import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Absence, Avance, AvanceEmploye, Conge, CongeEmploye, Contrat, ContratRequest, Payement, PayementEmploye, Personnel, Poste, absenceRequest } from '../model/admin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  //personnel
  public creerPersonnel(data: Personnel): Observable<Personnel> {

    return this.http.post<Personnel>(environment.backEndHost+"/createPersonnel", data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du personnel:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  public getListPersonnel():Observable<Array<Personnel>>{
    return this.http.get<Array<Personnel>>(environment.backEndHost+"/getAllPersonnel")
      .pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error);
        })
      );
  }


  public getEmploye(id:number):Observable<Personnel>{
    return this.http.get<Personnel>(environment.backEndHost+"/getOneEpmloye/"+id)
      .pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error);
        })
      );
  }

  public updatePersonnel(data: Personnel,id:number): Observable<Personnel> {

    return this.http.put<Personnel>(environment.backEndHost+"/updateEmployer/"+id, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du modification:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  public deletPersonnel(id:number): Observable<{}> {

    return this.http.delete<{}>(environment.backEndHost+"/deleteEmployer/"+id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du suppression:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }



  //poste
  public creerPoste(data:Poste):Observable<Poste> {
    return this.http.post<Poste>(environment.backEndHost+"/createPoste", data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du poste:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }
  public getListePoste():Observable<Array<Poste>> {
    return this.http.get<Array<Poste>>(environment.backEndHost+"/getAllPoste")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du poste:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  //contrant/getAllcontrat
  public creerContrant(dataReq:ContratRequest):Observable<Contrat> {
    
    return this.http.post<Contrat>(environment.backEndHost+"/employes/"+ dataReq.personnelId +"/contrats", dataReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la création du contrat:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  public getListeContrant():Observable<Array<Contrat>> {
    return this.http.get<Array<Contrat>>(environment.backEndHost+"/getAllcontrat")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de get liste contrat:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }


  //avance 

  public createAvance(avance:Avance):Observable<Avance>{
    const annee=parseInt(avance.annee!);
      const mois=parseInt(avance.mois!)
      let data={
        mois:mois,
        annee:annee,
        montant:avance.montant,
        EmployesId:avance.EmployesId,
        motif:avance.motif
      }
      return this.http.post(environment.backEndHost +"/createAvancePersonnel/"+avance.EmployesId,data).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.error('Erreur lors de creation', error);        
          return throwError(error);
        })
      )
  }


  public getListeAvance():Observable<Array<AvanceEmploye>> {
    return this.http.get<Array<AvanceEmploye>>(environment.backEndHost+"/getAllAvance")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de get liste contrat:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  //payement
  public createPayement(payement:Payement):Observable<Payement>{
    const annee=parseInt(payement.annee!);
      const mois=parseInt(payement.mois!)
      let data={
        mois:mois,
        annee:annee,
        montant:payement.montant,
        EmployesId:payement.EmployesId,
      }
      return this.http.post(environment.backEndHost +"/createPayement/"+payement.EmployesId,data).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.error('Erreur lors de creation', error);        
          return throwError(error);
        })
      )
  }

  public getListePayement():Observable<Array<PayementEmploye>> {
    return this.http.get<Array<PayementEmploye>>(environment.backEndHost+"/getAllPayment")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de get liste contrat:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

  //conge getAllConge
  public createConge(conge:Conge):Observable<Payement>{
      return this.http.post(environment.backEndHost +"/createConge/"+ conge.EmployesId,conge).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.error('Erreur lors de creation', error);        
          return throwError(error);
        })
      )
  }
  public getListeConge():Observable<Array<CongeEmploye>> {
    return this.http.get<Array<CongeEmploye>>(environment.backEndHost+"/getAllConge")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de get liste conge:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }

//absence
  public createAbsence(absence:absenceRequest):Observable<Absence>{
      return this.http.post(environment.backEndHost +"/createAbsencePersonnel",absence).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.error('Erreur lors de creation absence', error);        
          return throwError(error);
        })
      )
  }

  public getListeAbsence():Observable<Array<Absence>> {
    return this.http.get<Array<Absence>>(environment.backEndHost+"/getAllAbsence")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de get liste conge:', error);
          return throwError(error); // Renvoie l'erreur pour un traitement ultérieur
        })
      );
  }
}
