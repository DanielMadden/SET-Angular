import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CardActions } from 'src/app/actions';
import { ICard } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';
import { selectDeck, selectHand, State } from 'src/app/shared/state';

@Component({
  selector: 'app-set-card-deck',
  templateUrl: './set-card-deck.component.html',
  styleUrls: ['./set-card-deck.component.scss'],
})
export class SetCardDeckComponent implements OnChanges {
  @Input() deckType!: 'deck' | 'hand';
  cards$!: Observable<ICard[]>;
  stackCountArray: number[] = [];
  stackPixelHeight: number = 1;

  constructor(private store: Store<State>) {}

  ngOnChanges(): void {
    if (this.deckType === 'deck') this.cards$ = this.store.select(selectDeck);
    else if (this.deckType === 'hand')
      this.cards$ = this.store.select(selectHand);
    console.log(this.cards$);
    this.cards$.subscribe(
      (cards) => {
        console.log(cards);
        this.updateCards(cards);
      },
      (err) => console.error(`[ERROR]: ${err}`)
    );
  }

  private updateCards(cards: ICard[]): void {
    this.stackCountArray = [...Array(cards.length / 3).keys()];
  }

  public calculateShadow(): string {
    let pixels = (this.stackCountArray.length + 5) * 1;
    return `${pixels / 2}px ${pixels / 2}px ${pixels}px 1px rgba(0, 0, 0, 0.7)`;
  }

  public topWasClicked(): void {
    if (this.deckType === 'deck') this.triggerAddThreeCardsAction();
  }

  private triggerAddThreeCardsAction() {
    this.store.dispatch(CardActions.addThreeCards());
  }
}
