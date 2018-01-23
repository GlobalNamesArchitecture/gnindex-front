import {Component, EventEmitter, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class SearchBoxStatus {
  closeResult = '';
  searchText = '';
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.html'
})
export class SearchBoxComponent {
  status = new SearchBoxStatus();
  @Output() search = new EventEmitter<SearchBoxStatus>();

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
    console.log('hey');
    this.search.emit(this.status);
  }

  multilineSearch(content) {
    console.log('enter pressed ' + content);
    this.openModal(content);
  }

  openModal(content) {
    console.log('>>>>>>');
    this._modalService.open(content, {size: 'lg', windowClass: 'modal-xxl'})
      .result.then((result) => {
      this.status.closeResult = `Closed with: ${result}`;
      console.log(this.status.closeResult);
    }, (reason) => {
      this.status.closeResult = `Dismissed ${SearchBoxComponent.getDismissReason(reason)}`;
      console.log(this.status.closeResult);
    });
  }
}
