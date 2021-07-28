import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PracticePageActions } from 'src/app/actions';
import { ICardGridSlot } from 'src/app/models/card-grid-slot';
import { selectGridSlots, State } from 'src/app/shared/state';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-set-card-grid',
  templateUrl: './set-card-grid.component.html',
  styleUrls: ['./set-card-grid.component.scss'],
})
export class SetCardGridComponent implements OnInit {
  public slots$: Observable<ICardGridSlot[]>;

  public maxHeight!: string;
  public verticalPadding = parseInt(gameBarHeight) / 2 + 'px';

  constructor(private store: Store<State>) {
    this.slots$ = store.select(selectGridSlots);
  }

  ngOnInit(): void {
    this.store.dispatch(PracticePageActions.enter());
    this.setMaxHeightToWindow();
  }

  public selectCard(slotIndex: number): void {
    this.store.dispatch(
      PracticePageActions.selectCard({ cardGridSlotIndex: slotIndex })
    );
  }
  public deSelectCard(slotIndex: number): void {
    this.store.dispatch(
      PracticePageActions.deselectCard({ cardGridSlotIndex: slotIndex })
    );
  }

  @HostListener('window:resize')
  private setMaxHeightToWindow(): void {
    this.maxHeight = window.innerHeight + 'px';
  }
}
