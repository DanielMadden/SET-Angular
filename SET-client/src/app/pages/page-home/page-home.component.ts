import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  numbers = interval(1000);

  constructor(private router: Router) {
    interval(1000).subscribe(() => {
      // this.floatCards();
    });
  }

  ngOnInit(): void {}

  travelToPracticePage() {
    this.router.navigate(['practice']);
  }

  floatCards() {
    var elements = document.getElementsByClassName(
      'floating-card-container'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elements.length; i++) {
      let elementStyle = elements[i].style;
      elementStyle.top = Math.random() * 100 + '%';
      elementStyle.left = Math.random() * 100 + '%';
    }
  }
}
