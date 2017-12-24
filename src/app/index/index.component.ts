import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  searchText = '';
  allTriplets = [];
  currentTriplets = [];

  constructor() {
    const alphabetSize = 25;
    for (let letter1idx = 0; letter1idx <= alphabetSize; letter1idx++) {
      for (let letter2idx = 0; letter2idx <= alphabetSize; letter2idx++) {
        for (let letter3idx = 0; letter3idx <= alphabetSize; letter3idx++) {
          const triplet = String.fromCharCode(97 + letter1idx) +
            String.fromCharCode(97 + letter2idx) +
            String.fromCharCode(97 + letter3idx);
          this.allTriplets.push(triplet.toUpperCase());
        }
      }
    }
  }

  ngOnInit() {
  }

  updateCurrentTriplets() {
    this.searchText = this.searchText.substr(0, 3).toUpperCase();
    if (this.searchText.length === 0) {
      this.currentTriplets = [];
    } else {
      this.currentTriplets = this.allTriplets.filter(x => x.startsWith(this.searchText));
    }
  }

}
