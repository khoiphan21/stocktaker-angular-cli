import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';

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
      this.stockService.initKerkoDB();
    } else if (this.username === 'khoi' && this.password === 'khoiphan') {
      this.router.navigate(['/dashboard']);
      this.stockService.initDB;
    } else {
      this.error = true;
    }
  }

  constructor(
    private router: Router,
    private stockService: StockService
  ) { }

  ngOnInit() {
  }

}
