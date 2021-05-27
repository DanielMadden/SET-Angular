# Bars

- **Bar-Top:**

  - Shared component between desktop and mobile.
  - Displays logo and account button (potentially more)
  - Most likely very consistent through most pages

- **Bar-Bottom-Mobile:**

  - Used for navigation on the mobile view
  - Most likely consistent through different modes

- **Bar-Bottom-Desktop:**

  - Used for viewing statistics on the desktop view
  - Most likely will be utilized in other modes as well

- **Bar-Side-Mobile:**

  - Used to contain the stats and log component on mobile

- **Bar-Side-Mobile-Stats:**

  - Displays the stats on the top left corner of the bar-side-mobile component

# Game-Log

- **Game-Log:**

  - Used for displaying in-game activity
  - Contains game-log components

- **Game-Log-Message:**

  - Displays the three most recently attempted/succeeded/added cards
  - Displays the activity in large font
  - Displays any extra information
  - Stretches to 100% of it's container
  - Scrollable

- **Game-Log-Message-Card:**

  - Display behavior similar to the Set-Card, without the functionality

# Set-Card

- **Set-Card-Deck:**

  - Determines the amount of cards to stack depending on length of an array
  - Can be used for the original deck of set cards
  - Can be used collected Sets

- **Set-Card:**

  - Intakes four traits to determine what to display on the blank side
  - Depending on the screen size, rotate the cards appropriately
  - Can be selected
  - [ STRETCH ] Animate between decks

- **Set-Card-Grid:**
  - Always displays 3 columns
  - Default 4 rows
  - Depending on length of currently displayed cards, add extra rows
