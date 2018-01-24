import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class SearchBoxStatus {
  closeResult = '';
  searchText = '';

  isMultiline() {
    return this.searchText.indexOf('\n') > 0;
  }
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.html'
})
export class SearchBoxComponent {
  status = new SearchBoxStatus();
  @Output() search = new EventEmitter<SearchBoxStatus>();
  @ViewChild('searchInput') searchInput;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private _modalService: NgbModal) {
  }

  doSearch() {
    this.search.emit(this.status);
  }

  multilineSearch(content) {
    this.openModal(content);
  }

  openModal(content) {
    this._modalService.open(content, {size: 'lg', windowClass: 'modal-xxl'})
      .result.then((result) => {
      this.status.closeResult = `Closed with: ${result}`;
      console.log(this.status.closeResult);
    }, (reason) => {
      this.status.closeResult = `Dismissed ${SearchBoxComponent.getDismissReason(reason)}`;
      console.log(this.status.closeResult);
    });
  }

  handleFocus(content) {
    if (this.status.isMultiline()) {
      this.openModal(content);
      this.searchInput.nativeElement.blur();
    }
  }
}
