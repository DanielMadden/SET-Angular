import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { CardGridSlot, ICardGridSlot } from 'src/app/models/card-grid-slot';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';
import { DeckService } from 'src/app/services/deck.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-set-card-grid',
  templateUrl: './set-card-grid.component.html',
  styleUrls: ['./set-card-grid.component.scss'],
})
export class SetCardGridComponent implements OnInit {
  // public cards: ICard[] = [];
  public slots: ICardGridSlot[] = [];
  public selected: ISelectedCardSlot[] = [];
  @Output() setOfCards = new EventEmitter<[ICard, ICard, ICard]>();

  constructor(
    private deckService: DeckService,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      let newCards = this.deckService.pullThreeCardsFromDeck();
      newCards.forEach((card) => this.slots.push(new CardGridSlot(card)));
    }
  }

  public addCardToSelectedArray(index: number): void {
    this.selected.push({ slot: index, card: this.slots[index].card });
  }

  public selectCard(index: number): void {
    if (this.selected.length < 2) {
      this.addCardToSelectedArray(index);
      this.slots[index].selected = true;
    } else {
      this.addCardToSelectedArray(index);
      let cardsToCheck: [ICard, ICard, ICard] = [
        this.selected[0].card,
        this.selected[1].card,
        this.selected[2].card,
      ];
      console.log(cardsToCheck);
      if (
        this.matchService.checkIfMatchCheckPropertiesAreTrue(
          this.matchService.checkIfCardsMatch(cardsToCheck)
        )
      ) {
        let newCards = this.deckService.pullThreeCardsFromDeck();
        for (let i = 0; i < newCards.length; i++) {
          let slotIndex = this.slots[this.selected[i].slot];
          slotIndex.card = newCards[i];
          slotIndex.selected = false;
        }
        this.selected = [];
      } else {
        for (let i = 0; i < this.selected.length; i++) {
          let slotIndex = this.slots[this.selected[i].slot];
          slotIndex.selected = false;
        }
        this.selected = [];
      }
    }
  }

  public deSelectCard(index: number): void {
    this.slots[index].selected = false;
  }
}
