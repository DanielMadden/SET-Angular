# Match Service

- Purpose: To determine if an array of three cards constitutes a valid set.
- Input: [ICard, ICard, ICard]
- Output: Object of type ICardMatchCheck

```javascript
export interface ICardMatchCheck {
  [key: string]: boolean;
  count: boolean;
  color: boolean;
  shape: boolean;
  shade: boolean;
}
```
