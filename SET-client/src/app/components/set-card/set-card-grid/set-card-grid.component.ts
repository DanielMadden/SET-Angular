import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { CardActions } from 'src/app/actions';
import { ICardGridSlot } from 'src/app/models/card-grid-slot';
import { GameService } from 'src/app/services/game.service';
import { selectGridSlots, State } from 'src/app/shared/state';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-set-card-grid',
  templateUrl: './set-card-grid.component.html',
  styleUrls: ['./set-card-grid.component.scss'],
})
export class SetCardGridComponent implements OnInit {
  public slots$: Observable<ICardGridSlot[]>;
  public slots: ICardGridSlot[] = [];

  public maxHeight!: string;
  public verticalPadding = parseInt(gameBarHeight) / 2 + 'px';

  constructor(private store: Store<State>, private gameService: GameService) {
    this.slots$ = store.select(selectGridSlots);
    this.slots$.subscribe(
      pipe((slots: ICardGridSlot[]) => (this.slots = slots))
    );
  }

  ngOnInit(): void {
    this.setMaxHeightToWindow();
  }

  public clickCardEvent(slotIndex: number): void {
    this.slots[slotIndex].selected
      ? this.deSelectCard(slotIndex)
      : this.selectCard(slotIndex);
  }

  public selectCard(slotIndex: number): void {
    this.gameService.selectCardEvent(slotIndex);
  }
  public deSelectCard(slotIndex: number): void {
    this.store.dispatch(
      CardActions.deselectCard({ cardGridSlotIndex: slotIndex })
    );
  }

  @HostListener('window:resize')
  private setMaxHeightToWindow(): void {
    this.maxHeight = window.innerHeight + 'px';
  }
}
