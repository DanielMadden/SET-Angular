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

I desire this CardMatchCheck so I can give the user a more intuitive and informative explanation as to why their set failed.
