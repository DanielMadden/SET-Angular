# Match Service

- Purpose: To determine if an array of three cards constitutes a valid set.
- Input: [Card, Card, Card]
- Output: Object of type CardMatchCheck

```javascript
export interface CardMatchCheck {
  [key: string]: boolean;
  count: boolean;
  color: boolean;
  shape: boolean;
  shade: boolean;
}
```
