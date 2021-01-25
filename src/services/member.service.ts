import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Pub} from "../models/pub.model";
import {Event} from "../models/event.model";
import {Tool} from "../models/tool.model";


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // @ts-ignore
  // public placeholderMembers: Member[] = GLOBAL._DB.members;
  private members: Promise<Member[]>;

  private _localItem: string = '';

  private _localItem1: string = '';


  set localItem(value: string) {
    this._localItem = value;
    localStorage.setItem('localItem', value);
  }

  get localItem() {
    return this._localItem = localStorage.getItem('localItem')
  }

  set localItem1(value: string) {
    this._localItem1 = value;
    localStorage.setItem('localItem1', value);
  }

  get localItem1() {
    return this._localItem1 = localStorage.getItem('localItem1')
  }


  constructor(
    private httpClient: HttpClient,
  ) {
  }



  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:8083/membres').toPromise();
    //return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getAllMembersEtd(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:8083/membres').toPromise();
    //return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/membres/${id}`).toPromise();
    /*return new Promise(resolve => resolve(
      this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    ));*/
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */


  createMemberEtd(member: any): Promise<Member> {
    return this.httpClient.post<Member>('http://localhost:8083/membres/etudiant', member).toPromise();
  }

  updateMemberEtd(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:8083/membres/etudiant/${id}`, member).toPromise();
  }

  saveMember(member: any): Promise<Member> {
    //console.log('member to save: ', member);
    if (!!member.id) {
      if(member.type=='etudiant'){ return this.updateMemberEtd(member.id, member);}
      else if(member.type=='enseignant'){ return this.updateMemberEns(member.id, member);}

    }else {
      if(member.type=='etudiant'){ return this.createMemberEtd(member);}
      else if(member.type=='enseignant'){ return this.createMemberEns(member);}
    }
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    /*const memberToSave = {
      id: member.id ?? Math.ceil(Math.random() * 10000).toString(),
      createdDate: member.createdDate ?? new Date().toISOString(), ...member
    };
    this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    return new Promise(resolve => resolve(memberToSave));*/
  }

  createMemberEns(member: any): Promise<Member> {
    return this.httpClient.post<Member>('http://localhost:8083/membres/enseignant', member).toPromise();
  }

  updateMemberEns(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:8083/membres/enseignant/${id}`, member).toPromise();
  }

  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/membres/etudiant/${id}`).toPromise();
    /*this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    return new Promise(resolve => resolve());*/
  }

  affecterencadrantToetudiant(idetd: string, idens: string): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:8083/membres/etudiant/${idetd}/${idens}`,this.getMemberById(idetd)).toPromise();
  }

  getByEncadrant(idens: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/encadrant/${idens}`).toPromise();

  }

//pub
  getAllPub(): Promise<Pub[]> {
    return this.httpClient.get<Pub[]>('http://localhost:8083/publications').toPromise();
  }

  getPubById(id: string): Promise<Pub> {
    return this.httpClient.get<Pub>(`http://localhost:8083/publications/${id}`).toPromise();

  }

  savePub(pub: any): Promise<Pub> {
    if (!!pub.id) {
      return this.updatePub(pub.id, pub);
    }else {return this.createPub(pub);}

  }

  updatePub(id: string, pub: any) : Promise<Pub> {
    return this.httpClient.put<Pub>(`http://localhost:8083/publications/${id}`, pub).toPromise();
  }

  createPub(pub: any) : Promise<Pub> {
    return this.httpClient.post<Pub>(`http://localhost:8083/publications`, pub).toPromise();
  }

  deletePub(id: string) : Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/publications/${id}`).toPromise();
  }

  pubByMember(id: string) : Promise<Pub[]> {
    return this.httpClient.get<Pub[]>(`http://localhost:8083/publications/auteur/${id}`).toPromise();
  }

  getAutByPub(id: string) : Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/publications/pub/${id}`).toPromise();
  }

  affecterAutToPub(idaut: string, idpub: string): Promise<void> {
    return this.httpClient.put<void>(`http://localhost:8083/publications/pub/${idaut}/${idpub}`,this.getMemberById(idaut)).toPromise();
  }

  //event
  getAllEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:8083/events').toPromise();
  }

  getEventById(id: string): Promise<Event> {
    return this.httpClient.get<Event>(`http://localhost:8083/events/${id}`).toPromise();

  }

  saveEvent(event: any): Promise<Event> {
    if (!!event.id) {
      return this.updateEvent(event.id, event);
    }else {return this.createEvent(event);}

  }

  updateEvent(id: string, event: any) : Promise<Event> {
    return this.httpClient.put<Event>(`http://localhost:8083/events/${id}`, event).toPromise();
  }

  createEvent(event: any) : Promise<Event> {
    return this.httpClient.post<Event>(`http://localhost:8083/events`, event).toPromise();
  }

  deleteEvent(id: string) : Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/events/${id}`).toPromise();
  }

  affecterMembreToEvent(idm: string, idevent: string): Promise<void> {
    return this.httpClient.put<void>(`http://localhost:8083/events/event/${idm}/${idevent}`,this.getMemberById(idm)).toPromise();
  }

  getEventByMember(id: string) : Promise<Event[]> {
    return this.httpClient.get<Event[]>(`http://localhost:8083/events/membre/${id}`).toPromise();
  }

  getMembreByEvent(id: string) : Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/events/event/${id}`).toPromise();
  }


//tool
  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>('http://localhost:8083/tools').toPromise();
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`http://localhost:8083/tools/${id}`).toPromise();

  }

  saveTool(tool: any): Promise<Tool> {
    if (!!tool.id) {
      return this.updateTool(tool.id, tool);
    }else {return this.createTool(tool);}

  }

  updateTool(id: string, tool: any) : Promise<Tool> {
    return this.httpClient.put<Tool>(`http://localhost:8083/tools/${id}`, tool).toPromise();
  }

  createTool(tool: any) : Promise<Tool> {
    return this.httpClient.post<Tool>(`http://localhost:8083/tools`, tool).toPromise();
  }

  deleteTool(id: string) : Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/tools/${id}`).toPromise();
  }
  affecterMembreToTool(idm: string, idtool: string): Promise<void> {
    return this.httpClient.put<void>(`http://localhost:8083/tools/tool/${idm}/${idtool}`,this.getMemberById(idm)).toPromise();
  }
  getToolByMember(id: string) : Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`http://localhost:8083/tools/membre/${id}`).toPromise();
  }

  getMembreByTool(id: string) : Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/tools/tool/${id}`).toPromise();
  }

  //Research Member
  getMemberByEmail(email: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/membres/email=${email}`).toPromise();
  }

  getMemberByCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8083/membres/cin=${cin}`).toPromise();
  }
  getMemberByNom(nom: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/nom=${nom}`).toPromise();
  }
  getMemberByPrenom(prenom: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/prenom=${prenom}`).toPromise();
  }
  getMemberByNomAndPrenom(nom: string, prenom: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/${nom}/${prenom}`).toPromise();

  }
  //Research Member etd
  getMemberByDiplome(d: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/diplome=${d}`).toPromise();
  }
  //Research Member ens
  getMemberByGrade(g: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/grade=${g}`).toPromise();
  }

  getMemberByEtablissement(e: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/etablissement=${e}`).toPromise();
  }

  getMemberByGradeAndEtablissement(g: string, e: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8083/membres/grade=${g}/etablissement=${e}`).toPromise();
  }

  //Research Pub
  getPubByType(e: string): Promise<Pub[]> {
    return this.httpClient.get<Pub[]>(`http://localhost:8083/publications/type=${e}`).toPromise();
  }

  getPubByDate(date: Date): Promise<Pub[]> {
    return this.httpClient.get<Pub[]>(`http://localhost:8083/publications/dateApparition=${date}`).toPromise();
  }

  //login

  public login(member : Member) :Promise<Member>{
    return this.httpClient.post<Member>(`http://localhost:8083/login/${member.email}/${member.password}`, null).toPromise();
  }


}
