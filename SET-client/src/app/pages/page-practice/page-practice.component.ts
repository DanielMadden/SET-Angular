import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-page-practice',
  templateUrl: './page-practice.component.html',
  styleUrls: ['./page-practice.component.scss'],
})
export class PagePracticeComponent implements OnInit {
  constructor(
    private deckService: DeckService,
    private matchService: MatchService
  ) {}

  deck!: Observable<Card[]>;

  ngOnInit(): void {}
}
