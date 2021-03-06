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
import { StocktakeManagerService } from './shared/managers/stocktake-manager.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuService } from './side-menu.service';
import { StockSetupComponent } from './stock-setup/stock-setup.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { CategoryHeadingComponent } from './category-heading/category-heading.component';
import { SectionDisplayComponent } from './section-display/section-display.component';
import { StockItemManagerService } from './shared/managers/stock-item-manager.service';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { AddNewMenuComponent } from './add-new-menu/add-new-menu.component';
import { AddNewComponent } from './add-new/add-new.component';
import { StockService } from './stock.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { StockTakeComponent } from './stock-take/stock-take.component';
import { StockTakeWarehouseComponent } from './stock-take-warehouse/stock-take-warehouse.component';
import { StocktakeItemComponent } from './stocktake-item/stocktake-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopHeaderComponent,
    BlockHeadingComponent,
    SideMenuComponent,
    StockSetupComponent,
    SectionHeadingComponent,
    CategoryHeadingComponent,
    SectionDisplayComponent,
    CategoryDisplayComponent,
    StockItemComponent,
    AddNewMenuComponent,
    AddNewComponent,
    LoginPageComponent,
    StockTakeComponent,
    StockTakeWarehouseComponent,
    StocktakeItemComponent
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
    StockService,
    StockItemManagerService,
    StocktakeManagerService,
    SideMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
