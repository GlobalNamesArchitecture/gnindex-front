import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  letters = [];
  currentTriplets = [];
  allTriplets = [];

  constructor() {
    const alphabetSize = 25;

    for (let letterIdx = 0; letterIdx < alphabetSize; letterIdx++) {
      this.letters.push(String.fromCharCode(97 + letterIdx).toUpperCase());
    }

    for (let letter1idx = 0; letter1idx <= alphabetSize; letter1idx++) {
      for (let letter2idx = 0; letter2idx <= alphabetSize; letter2idx++) {
        for (let letter3idx = 0; letter3idx <= alphabetSize; letter3idx++) {
          const triplet =
            String.fromCharCode(97 + letter1idx) +
            String.fromCharCode(97 + letter2idx) +
            String.fromCharCode(97 + letter3idx);
          this.allTriplets.push(triplet.toUpperCase());
        }
      }
    }
  }

  ngOnInit() {
  }

  selectLetter(letter: string) {
    this.currentTriplets = this.allTriplets.filter(x => x.startsWith(letter.toUpperCase()));
    console.log(letter);
  }
}
