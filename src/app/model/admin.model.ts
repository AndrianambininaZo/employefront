export class Personnel{
    id?:number;
    nom?:string;
    matricule?:number;
    dateNaissance?:Date;
    cin?:number;
    email?:string;
    prenom?:string  
}

export class ContratRequest{
    montant?:number ;
    debut?:Date;
    fin?:Date ;
    posteId?:number;
    personnelId?:number;
}
export class Contrat{
    id?:number
    montant?:string ;
    debut?:Date;
    fin?:Date ;
    Postes?:Poste; 
    Employes?:Personnel;   
}

export class Poste{
    id?:number;
    description?:string;
    nom?:string;    
}

export class Avance{
    mois?:string;
    annee?: string;
    montant?:string;
    EmployesId?:number;
    motif?:string;
}

export class Payement{
    mois?:string;
    annee?: string;
    montant?:string;
    EmployesId?:number;
}
export class PayementEmploye{
    mois?:string;
    annee?: string;
    montant?:number;
    Employes?:Personnel;
    avance?:number;
    totalMontant?:number
}

export class AvanceEmploye{
    mois?:string;
    annee?: string;
    montant?:number;
    Employes?:Personnel;
    motif?:string;
}
export class Conge{
    id?:number;
    dateFin?:Date;
    dateDebut?:Date;
    motif?:string
    EmployesId?:number
}

export class CongeEmploye{
    id?:number;
    dateFin?:Date;
    dateDebut?:Date;
    motif?:string
    Employes?:Personnel
}

export class absenceRequest{
    date?:Date;
    EmployesId?:number;
}

export class Absence{
    id?:number;
    date?:Date;
    Employes?:Personnel
}