import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './shared/routes';
import { materials } from './shared/materials';

import { PagePracticeComponent } from './pages/page-practice/page-practice.component';
import { BarTopComponent } from './components/bars/bar-top/bar-top.component';
import { BarBottomMobileComponent } from './components/bars/bar-bottom-mobile/bar-bottom-mobile.component';
import { BarBottomDesktopComponent } from './components/bars/bar-bottom-desktop/bar-bottom-desktop.component';
import { BarSideMobileComponent } from './components/bars/bar-side-mobile/bar-side-mobile.component';
import { BarSideMobileStatsComponent } from './components/bars/bar-side-mobile-stats/bar-side-mobile-stats.component';
import { GameLogComponent } from './components/game-log/game-log/game-log.component';
import { GameLogMessageComponent } from './components/game-log/game-log-message/game-log-message.component';
import { GameLogMessageCardComponent } from './components/game-log/game-log-message-card/game-log-message-card.component';
import { SetCardDeckComponent } from './components/set-card/set-card-deck/set-card-deck.component';
import { SetCardComponent } from './components/set-card/set-card/set-card.component';
import { SetCardGridComponent } from './components/set-card/set-card-grid/set-card-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetCardBackComponent } from './components/set-card/set-card-back/set-card-back.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    PagePracticeComponent,
    BarTopComponent,
    BarBottomMobileComponent,
    BarBottomDesktopComponent,
    BarSideMobileComponent,
    BarSideMobileStatsComponent,
    GameLogComponent,
    GameLogMessageComponent,
    GameLogMessageCardComponent,
    SetCardDeckComponent,
    SetCardComponent,
    SetCardGridComponent,
    SetCardBackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ...materials,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
