import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Pub} from "../models/pub.model";


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // @ts-ignore
 // public placeholderMembers: Member[] = GLOBAL._DB.members;
  private members: Promise<Member[]>;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:9999/membre-service/membres').toPromise();
    //return new Promise(resolve => resolve(this.placeholderMembers));
  }


  getAllPub(): Promise<Pub[]> {
    return this.httpClient.get<Pub[]>('http://localhost:9999/membre-service/publications').toPromise();
  }

  getPubById(id: string): Promise<Pub> {
    return this.httpClient.get<Pub>(`http://localhost:9999/membre-service/publications/${id}`).toPromise();

  }

  savePub(pub: any): Promise<Pub> {
    if (!!pub.id) {
      return this.updatePub(pub.id, pub);
    }else {return this.createPub(pub);}

  }


  getAllMembersEtd(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:9999/membre-service/membres').toPromise();
    //return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
     return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membres/${id}`).toPromise();
    /*return new Promise(resolve => resolve(
      this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    ));*/
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */


  createMemberEtd(member: any): Promise<Member> {
    return this.httpClient.post<Member>('http://localhost:9999/membre-service/membres/etudiant', member).toPromise();
  }

  updateMemberEtd(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:9999/membre-service/membres/etudiant/${id}`, member).toPromise();
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
    return this.httpClient.post<Member>('http://localhost:9999/membre-service/membres/enseignant', member).toPromise();
  }

  updateMemberEns(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:9999/membre-service/membres/enseignant/${id}`, member).toPromise();
  }

  removeMemberById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:9999/membre-service/membres/etudiant/${id}`).toPromise();
    /*this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    return new Promise(resolve => resolve());*/
  }

  affecterencadrantToetudiant(idetd: string, idens: string): Promise<Member> {
    return this.httpClient.put<Member>(`http://localhost:9999/membre-service/membres/etudiant/${idetd}/${idens}`,this.getMemberById(idetd)).toPromise();
  }

  getByEncadrant(idens: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/membre-service/membres/encadrant/${idens}`).toPromise();

  }


  updatePub(id: string, pub: any) : Promise<Pub> {
    return this.httpClient.put<Pub>(`http://localhost:9999/membre-service/publications/${id}`, pub).toPromise();
  }

  createPub(pub: any) : Promise<Pub> {
    return this.httpClient.post<Pub>(`http://localhost:9999/membre-service/publications`, pub).toPromise();
  }

  deletePub(id: string) : Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/membre-service/publications/${id}`).toPromise();
  }
  ///publications/auteur/{id}

  pubByMember(id: string) : Promise<Pub[]> {
    return this.httpClient.get<Pub[]>(`http://localhost:9999/membre-service/publications/auteur/${id}`).toPromise();
  }

  getAutByPub(id: string) : Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/publications/pub/${id}`).toPromise();
  }
}
