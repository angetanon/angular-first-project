import {Subject} from 'rxjs/Subject';

export class AppareilService{
  appareilsSubject = new Subject<any[]>();

   private appareils = [
        {
          id: 1,
          name: 'Machine à laver',
          status: 'éteint'
        },
        {
          id: 2,
          name: 'Frigo',
          status: 'allumé'
        },
        {
          id: 3,
          name: 'Ordinateur',
          status: 'en veille'
        }
      ];

      emitAppareilSubject(){
        this.appareilsSubject.next(this.appareils.slice());
      }

      switchOnAll() { //modifie le status de tous les appareils =>allumé
        for(let appareil of this.appareils) {
          appareil.status = 'allumé';
        }
    }
    
    switchOffAll() {
        for(let appareil of this.appareils) { //modifie le status de tous les appareils =>éteint
          appareil.status = 'éteint';
        }
    }
    switchOnOne(i: number) { //modifie le status d'un appareil en fonction de son indexe =>allumé
      this.appareils[i].status = 'allumé';
  }
  
  switchOffOne(i: number) { //modifie le status d'un appareil en fonction de son indexe =>éteint
      this.appareils[i].status = 'éteint';
  }

  getAppareilById(id: number) { //récupère l'appareil à partir de son id
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id; //compare si id fourni(id URL) == id appareil => return appareil
      }
    );
    return appareil;
}
}