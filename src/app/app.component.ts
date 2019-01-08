import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription


  ngOnInit() {
    const counter = Observable.interval(1000);    //observable
   this.counterSubscription = counter.subscribe(                            //observer
      (value) => {                                //information émis par l'observable
        this.secondes = value;                    //tâche exécuter par l'observer
      },
      (error) => {
        console.log('uh-oh, an error occured! :' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }


}
