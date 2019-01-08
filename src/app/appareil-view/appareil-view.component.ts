import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[];
  appareilSubscription: Subscription;
  //isAuth = false;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { //charger les données et méthodes du service dans le component
    /*setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );*/
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[])=>{
       this.appareils = appareils
      }
    ); //initialise appareils à partir de ses valeurs dans le service  
  this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
     //console.log('On allume tout !');
    //document.body.innerHTML = 'On allume tout !';
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  ngOnDestroy(){
  this.appareilSubscription.unsubscribe();
  }

}

