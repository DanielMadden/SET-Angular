# Notes

## Variables

- Denoted with a dollar sign
  - `$myColor: #ffeedd;`

## Operations

## Functions

- Colors
  - `lighten($color, 10%);`
  - `darken($color, 10%);`
  - `saturate($color, 10%);`
  - `desaturate($color, 10%);`
  - `fade_in($color, .1);`
  - `fade_out($color, .1);`
  - `invert($color);`
  - `complement($color);`
- Quote
  - `quote($sometext)`
  - `unquote($sometext`
- If
  - `if(true, $color1, $color2)`
- Math
  - `round(3.14);`
  - `ceil(3.14);`
  - `floor(3.14);`
  - `percentage(.14);`

## String Interpolation

```SCSS
$root: "/images/";

#form {
    background: url("#{root}background.jpg");
}
```

## Rules

- Sass allows for nesting selectors within the parent selector for cleaner, more organized code.
- `&` parent selector when within the nest
- Subproperties can be used on properties with many subs attached to them, such as font with font-family and font-size
  - `font:{family: ...; size: ...}`

## Directives

### `@import`

- Typical import syntax, can also be imported into curlies

### `@extend`

- Basically, "this selector extends this selector"

```SCSS
// Inherits Styles from another
.button {
    color: Black;
}
.submit-button {
    @extend .button;
    border: 1px Black solid;
}

// Converts to...

.submit-button {
    border: 1px solid Black;
}

.button, .submit-button {
    color: Black;
}
```

### `@mixin`

- Repeatable sections
  - Feel like functions
  - Used insert one or more than one name/value pair
  - Can accept parameters defaults and overloads

```SCSS
@mixin font-large {
    font: {
        size: 14px;
        family: san-serif;
        weight: bold;
    }
}

#form {
    @include font-large
}
```

Usually, these mixins will take in arguments:

```SCSS
// Parameters
@mixin roudned-corners-all($size) {
    border-radius: $size;
    -webkit-border-radius: $size;
    -moz-border-radius: $size;
}

#form {
    @include rounded-corners-all(5px);
}
```

A default argument value can be set as well if no value is passed in:

```SCSS
// Parameters
@mixin roudned-corners-all($size: 5px) {
    border-radius: $size;
    -webkit-border-radius: $size;
    -moz-border-radius: $size;
}

#form {
    @include rounded-corners-all;
}
```

### `@function`

```SCSS
// Value calculations
$app-width: 900px;
@function column-wi dth($cols) {
    @return ($app-width / $cols) - ($cols *5px);
}

.col2 {
    width: column-width(2);
}

.col3 {
    width: column-width(3);
}
```

## Control Directives

### `@if`

```SCSS
h1 {
    @if $size > 15px {
        color: blue;
    }
    @else if $size < 14px {
        color: red;
    }>
    @else {
        color: green
    }
}
```

### `@for`

```SCSS
$page-width: 1000px;

@for $col from 1 through 4 {
    .col#{$col} {
        width: $page-width / $col;
    }
}
```

### `@each`

```SCSS
@each $item in first, second, third, fourth {
    .#{$item} {
        background-url: url(/images/#{$item}.jpg)
    }
}
```

### `@while`

```SCSS
$i: 1;
@while $i < 5 {
    h#{$i} {
        font-size: $i * 4px;
        $i: $i + 1;
    }
}
```

---

# Summary

## Staying SASSy

- SASS allows you to bring your developer head to design
- SASS improves reuse and readability
- SASS allows you to structure and modularize your designs
- SASS enables control flow, templating and more to your styling
