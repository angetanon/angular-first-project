import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {
  name: string = 'Appareil'; //initialise name dans le component avant de le récupérer dans le service via le constructeur
  status: string = 'Statut'; //initialise status dans le component avant de le récupérer dans le service via le constructeur

  constructor(private appareilService: AppareilService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; //on récupère l'identifiant de l'URL contenu dans l'objet snapshot. const car identifaint unique, qu'on va utiliser dans le code en dessous
    this.name = this.appareilService.getAppareilById(+id).name; //On récupère name et status à partir de son id. +id caste string=>number
    this.status = this.appareilService.getAppareilById(+id).status;
  }

}
