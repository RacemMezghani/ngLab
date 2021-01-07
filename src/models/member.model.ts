export interface Member {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  photo: string;
  dateNaissance: Date;
  cv: string;
  email: string;
  password: string;
  type: string;

  //Etudiant
  dateInscription: Date;
  sujet : string;
  diplome: string;

  //Enseignant
  etablissement: string;
  grade :string;

  encadrant: Member;
  etudiants: Array<Member>;


}
