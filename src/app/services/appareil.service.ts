import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AppareilService {
  appareilsSubject = new Subject<any[]>();

  private appareils = [];

  constructor(private httpClient: HttpClient) { }

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice()); //mis à jour des données de l'objet
  }

  switchOnAll() { //modifie le status de tous les appareils =>allumé
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) { //modifie le status de tous les appareils =>éteint
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(i: number) { //modifie le status d'un appareil en fonction de son indexe =>allumé
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) { //modifie le status d'un appareil en fonction de son indexe =>éteint
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) { //récupère l'appareil à partir de son id
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id; //compare si id fourni(id URL) == id appareil => return appareil
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    }

    appareilObject.name = name;
    appareilObject.status = status;
    if (this.appareils.length > 0) {
      appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1; //Récupère l'id du derniner élément (index=this.appareils.length -1) et on ajoute 1. On écrémente de 1 le dernier id
    } else{
      appareilObject.id = 0
    }
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  updateAppareil() {
    this.httpClient
      .put('https://http-client-demo-ange.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  createAppareil() {
    this.httpClient
      .post('https://http-client-demo-ange.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveAppareilsToServer() {
    if (this.appareils == []) {
      this.createAppareil();
    } else {
      this.updateAppareil();
    }
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://http-client-demo-ange.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}