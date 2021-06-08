import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from './models/card';
import { DeckService } from './services/deck.service';
import { MatchService } from './services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SET-client';

  ngOnInit() {}
}
