import { Action, createReducer, on } from '@ngrx/store';
import { Card, ICard } from 'src/app/models/card';
import { CardGridSlot, ICardGridSlot } from 'src/app/models/card-grid-slot';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';
import { PracticePageActions } from 'src/app/actions';
import * as cardFunctions from './cards.functions';
import * as matchFunctions from './match.functions';
import { state } from '@angular/animations';
import { GameLog, IGameLog } from 'src/app/models/game-log';

export interface State {
  deck: ICard[];
  hand: ICard[];
  gridSlots: ICardGridSlot[];
  selectedGridSlots: ISelectedCardSlot[];
  gameLogs: IGameLog[];
}

export const initialState: State = {
  deck: [],
  hand: [],
  gridSlots: [],
  selectedGridSlots: [],
  gameLogs: [],
};

export const cardsReducer = createReducer(
  initialState,
  on(PracticePageActions.enter, (state) => {
    let newDeck = cardFunctions.createDeck();
    let newCards = cardFunctions.pullTwelveRandomCardsFromDeck(newDeck);
    let newSlots = cardFunctions.newGridSlotsFromCards(newCards);
    return {
      ...state,
      deck: newDeck,
      gridSlots: newSlots,
    };
  }),
  on(PracticePageActions.addThreeCards, (state) => {
    let newDeck = [...state.deck];
    let newCards = cardFunctions.pullThreeRandomCardsFromDeck(newDeck);
    let newSlots = cardFunctions.newGridSlotsFromCards(newCards);
    return {
      ...state,
      gridSlots: [...state.gridSlots, ...newSlots],
      deck: newDeck,
    };
  }),
  on(PracticePageActions.selectCard, (state, action) => {
    let newGridSlots = JSON.parse(JSON.stringify(state.gridSlots));
    newGridSlots[action.cardGridSlotIndex].selected = true;
    if (state.selectedGridSlots.length < 2) {
      return {
        ...state,
        gridSlots: newGridSlots,
        selectedGridSlots: [
          ...state.selectedGridSlots,
          {
            slotIndex: action.cardGridSlotIndex,
            card: state.gridSlots[action.cardGridSlotIndex].card,
          },
        ],
      };
    } else {
      let selectedGridSlots = [
        ...state.selectedGridSlots,
        {
          slotIndex: action.cardGridSlotIndex,
          card: state.gridSlots[action.cardGridSlotIndex].card,
        },
      ];
      selectedGridSlots.forEach(
        (slot) => (newGridSlots[slot.slotIndex].selected = false)
      );
      let cards: [Card, Card, Card] = [
        selectedGridSlots[0].card,
        selectedGridSlots[1].card,
        selectedGridSlots[2].card,
      ];
      let matchCheck = matchFunctions.generateMatchCheck(cards);
      if (matchFunctions.checkIfMatchCheckIsSet(matchCheck)) {
        if (state.gridSlots.length <= 12) {
          let newDeck = [...state.deck];
          let newCards = cardFunctions.pullThreeRandomCardsFromDeck(newDeck);
          newGridSlots = cardFunctions.replaceActiveCards(
            newGridSlots,
            selectedGridSlots,
            newCards
          );
          return {
            ...state,
            gameLogs: [...state.gameLogs, new GameLog(cards, 'match')],
            selectedGridSlots: [],
            gridSlots: newGridSlots,
            deck: newDeck,
            hand: [...state.hand, ...cards],
          };
        } else {
          newGridSlots = cardFunctions.shrinkSlotsArray(
            newGridSlots,
            selectedGridSlots
          );
          return {
            ...state,
            gameLogs: [new GameLog(cards, 'match'), ...state.gameLogs],
            selectedGridSlots: [],
            gridSlots: newGridSlots,
            hand: [...state.hand, ...cards],
          };
        }
      } else {
        return {
          ...state,
          gameLogs: [new GameLog(cards, 'no match'), ...state.gameLogs],
          selectedGridSlots: [],
          gridSlots: newGridSlots,
        };
      }
    }
  }),
  on(PracticePageActions.deselectCard, (state, action) => {
    let newGridSlots = JSON.parse(JSON.stringify(state.gridSlots));
    newGridSlots[action.cardGridSlotIndex].selected = false;
    let newSelectedGridSlots = [...state.selectedGridSlots];
    let slotIndex = newSelectedGridSlots.findIndex(
      (slot) => slot.slotIndex === action.cardGridSlotIndex
    );
    newSelectedGridSlots.splice(slotIndex, 1);
    return {
      ...state,
      selectedGridSlots: newSelectedGridSlots,
      gridSlots: newGridSlots,
    };
  })
);

export function reducer(state: undefined | State, action: Action) {
  return cardsReducer(state, action);
}

export const selectDeck = (state: State) => state.deck;
export const selectDeckLength = (state: State) => state.deck.length;
export const selectHand = (state: State) => state.deck;
export const selectHandLength = (state: State) => state.hand.length;
export const selectGridSlots = (state: State) => state.gridSlots;
export const selectActiveGridSlots = (state: State) => state.selectedGridSlots;
export const selectGameLogs = (state: State) => state.gameLogs;
