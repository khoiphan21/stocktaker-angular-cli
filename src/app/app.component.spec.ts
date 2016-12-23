/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddNewComponent } from './add-new/add-new.component';
import { AddNewMenuComponent } from './add-new-menu/add-new-menu.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { SectionDisplayComponent } from './section-display/section-display.component';
import { CategoryHeadingComponent } from './category-heading/category-heading.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { StockSetupComponent } from './stock-setup/stock-setup.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BlockHeadingComponent } from './block-heading/block-heading.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardManagerService } from './shared/managers/dashboard-manager.service';
import { StockQuantityManagerService } from './shared/managers/stock-quantity-manager.service';
import { StockItemManagerService } from './shared/managers/stock-item-manager.service';
import { StocktakeManagerService } from './shared/managers/stocktake-manager.service';
import { SideMenuService } from './side-menu.service';
import { StockService } from './stock.service';

describe('App: StocktakerAngularCli', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    AddNewComponent
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
    StockItemManagerService,
    StocktakeManagerService,
    SideMenuService,
    StockService
  ]
    });
  });

  // it('should create the app', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app works!'`, async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
