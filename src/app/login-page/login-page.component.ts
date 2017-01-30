import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private username: string;
  private password: string;
  private error: boolean;

  constructor(
    private router: Router,
    private stockService: StockService,
    private itemManager: StockItemManagerService
  ) { }

  login() {
    if (this.username === "kerko" && this.password === "kerkofood") {
      localStorage.setItem('user', 'kerko');
    } else if (this.username === 'khoi' && this.password === 'khoiphan') {
      localStorage.setItem('user', 'khoi');
    } else {
      this.error = true;
      return;
    }

    this.itemManager.loginWithUser(this.username);

    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
