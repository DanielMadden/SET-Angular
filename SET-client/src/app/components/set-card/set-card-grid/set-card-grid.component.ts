import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
  private deckIsEmpty = false;
  public slots: ICardGridSlot[] = [];
  public selectedSlots: ISelectedCardSlot[] = [];
  @Output() setOfCardsEvent = new EventEmitter<[ICard, ICard, ICard]>();
  @Output() falseSetOfCardsEvent = new EventEmitter<[ICard, ICard, ICard]>();
  @Input() listenToAddThreeCards$!: Observable<boolean>;
  @Output() plusThreeCardsEvent = new EventEmitter<[ICard, ICard, ICard]>();
  @Output() gameStartEvent = new EventEmitter<boolean>();

  constructor(
    private deckService: DeckService,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.listenToDeck();
    this.listenToAddThreeCards();
    this.startGame();
  }

  private startGame(): void {
    for (let i = 0; i < 4; i++) this.addThreeCards();
    this.emitGameStart();
  }

  private listenToAddThreeCards() {
    this.listenToAddThreeCards$.subscribe(
      () => this.addThreeCards(),
      (err) => console.error(`[ERROR]: ${err}`)
    );
  }

  private listenToDeck() {
    this.deckService.deck$.subscribe({
      complete: () => {
        this.deckIsEmpty = true;
        console.log('deck is empty!');
      },
    });
  }

  private addThreeCards(): void {
    let newCards = this.deckService.pullThreeCardsFromDeck();
    newCards.forEach((card) => this.slots.push(new CardGridSlot(card)));
    this.emitPlusThreeCardsToParent(newCards);
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

  private replaceActiveCards(): void {
    if (!this.deckIsEmpty && this.slots.length <= 12) {
      let newCards = this.deckService.pullThreeCardsFromDeck();
      for (let i = 0; i < newCards.length; i++) {
        let slotIndex = this.slots[this.selectedSlots[i].slotIndex];
        slotIndex.card = newCards[i];
        slotIndex.selected = false;
      }
    } else this.shrinkSlotsArray();
  }

  private shrinkSlotsArray(): void {
    this.selectedSlots.sort((a, b) => b.slotIndex - a.slotIndex);
    for (let i = 0; i < this.selectedSlots.length; i++) {
      this.slots.splice(this.selectedSlots[i].slotIndex, 1);
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
      this.checkIfCardsMatchThenAct(cardsToCheck);
    }
  }

  private checkIfCardsMatchThenAct(cardsToCheck: [ICard, ICard, ICard]): void {
    let cardMatchCheck = this.matchService.generateMatchCheck(cardsToCheck);
    let validSet = this.matchService.checkIfMatchCheckIsSet(cardMatchCheck);
    if (validSet) {
      this.deSelectCards();
      this.emitSetOfCardsToParent(cardsToCheck);
      this.replaceActiveCards();
      this.resetSelectedCards();
    } else {
      this.deSelectCards();
      this.emitFalseSetOfCardsToParent(cardsToCheck);
      this.resetSelectedCards();
    }
  }

  private emitFalseSetOfCardsToParent(cards: [ICard, ICard, ICard]) {
    this.falseSetOfCardsEvent.emit(cards);
  }

  private emitSetOfCardsToParent(cards: [ICard, ICard, ICard]) {
    this.setOfCardsEvent.emit(cards);
  }

  private emitPlusThreeCardsToParent(cards: [ICard, ICard, ICard]) {
    this.plusThreeCardsEvent.emit(cards);
  }

  private emitGameStart() {
    this.gameStartEvent.emit(true);
  }
}
