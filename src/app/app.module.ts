import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { BlockHeadingComponent } from './block-heading/block-heading.component';
import { DashboardManagerService } from './shared/managers/dashboard-manager.service';
import { StockQuantityManagerService } from './shared/managers/stock-quantity-manager.service';
import { MainManagerService } from './shared/managers/main-manager.service';
import { SectionManagerService } from './shared/managers/section-manager.service';
import { StocktakeManagerService } from './shared/managers/stocktake-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopHeaderComponent,
    BlockHeadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DashboardManagerService,
    StockQuantityManagerService,
    MainManagerService,
    SectionManagerService,
    StocktakeManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
