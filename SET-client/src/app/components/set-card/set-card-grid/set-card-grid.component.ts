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
  public selectedSlots: ISelectedCardSlot[] = [];
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

  private resetSelectedCards(): void {
    this.selectedSlots = [];
  }

  private addCardToSelectedArray(slotIndex: number): void {
    this.selectedSlots.push({
      slotIndex: slotIndex,
      card: this.slots[slotIndex].card,
    });
  }

  private removeCardFromSelectedArray(slotIndex: number): void {
    let selectedCardSlotIndex = this.selectedSlots.findIndex(
      (selectedCardSlot) => selectedCardSlot.slotIndex == slotIndex
    );
    this.selectedSlots.splice(selectedCardSlotIndex, 1);
  }

  public deSelectCard(slotIndex: number): void {
    this.slots[slotIndex].selected = false;
    this.removeCardFromSelectedArray(slotIndex);
  }

  private deSelectCards(): void {
    for (let i = 0; i < this.selectedSlots.length; i++) {
      let slotIndex = this.selectedSlots[i].slotIndex;
      this.slots[slotIndex].selected = false;
    }
  }

  private replaceActiveCards(newCards: [ICard, ICard, ICard]) {
    for (let i = 0; i < newCards.length; i++) {
      let slotIndex = this.slots[this.selectedSlots[i].slotIndex];
      slotIndex.card = newCards[i];
      slotIndex.selected = false;
    }
  }

  public selectCard(index: number): void {
    if (this.selectedSlots.length < 2) {
      this.addCardToSelectedArray(index);
      this.slots[index].selected = true;
    } else {
      this.addCardToSelectedArray(index);
      let cardsToCheck: [ICard, ICard, ICard] = [
        this.selectedSlots[0].card,
        this.selectedSlots[1].card,
        this.selectedSlots[2].card,
      ];
      this.checkIfCardsMatch(cardsToCheck);
    }
  }

  private checkIfCardsMatch(cardsToCheck: [ICard, ICard, ICard]) {
    let cardMatchCheck = this.matchService.generateMatchCheck(cardsToCheck);
    let validSet = this.matchService.checkIfMatchCheckIsSet(cardMatchCheck);
    if (validSet) {
      let newCards = this.deckService.pullThreeCardsFromDeck();
      this.replaceActiveCards(newCards);
      this.resetSelectedCards();
    } else {
      this.deSelectCards();
      this.resetSelectedCards();
    }
  }
}
