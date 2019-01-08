import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import {Router} from '@angular/router'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  message: string= 'Sign in successfull';

  constructor(private authService: AuthService, private router: Router ) { } //charger les données et méthodes du service et router dans le component  

  ngOnInit() {
    this.authStatus = this.authService.isAuth; //initialise authstatus à partir de sa valeur dans le service
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log(this.message);
        //document.body.innerHTML='Sign in successfull';
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    );
  }

  
    onSignOut() {
      this.authService.signOut();
      this.authStatus = this.authService.isAuth;
    }
  
}
