import {Component, OnInit, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SearchStatus, SearchStatusService} from './search-box.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search-box',
  styleUrls: ['./search-box.scss'],
  templateUrl: './search-box.html',
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('searchInput') searchInput;
  status = new SearchStatus();

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private _modalService: NgbModal,
              private _searchStatusService: SearchStatusService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.status.searchText = params['q'];
    });
  }

  doSearch() {
    console.log('doing search:');
    console.log(this.status);
    this._searchStatusService.search(this.status);
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
