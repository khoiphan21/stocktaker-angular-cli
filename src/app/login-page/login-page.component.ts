import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private username: string;
  private password: string;
  private error: boolean;

  login() {
    if (this.username === "kerko" && this.password === "kerkofood") {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

}
