import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SearchStatus, SearchStatusService} from './search-box.service';
import {ActivatedRoute, Params} from '@angular/router';
import {IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Pipe({name: 'searchTextGetter'})
export class SearchTextGetter implements PipeTransform {
  transform(searchQuery: string): string {
    const searchStatus = new SearchStatus(searchQuery);
    if (searchStatus.isMultiline()) {
      return `${searchStatus.chunks().join(' | ')}`;
    } else {
      return searchStatus.searchText;
    }
  }
}

@Component({
  selector: 'app-search-box',
  styleUrls: ['./search-box.scss'],
  templateUrl: './search-box.html',
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('searchInput') searchInput;
  status = new SearchStatus();

  multiSelectSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    fixedTitle: true,
  };

  multiSelectTexts: IMultiSelectTexts = {
    defaultTitle: 'Databases',
  };

  multiSelectOption = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Catalogue of Life'},
    {id: 11, name: 'GBIF'},
    {id: 3, name: 'ITIS'},
    {id: 5, name: 'Index Fungorum'},
    {id: 167, name: 'IPNI'},
    {id: 12, name: 'EOL'},
    {id: 7, name: 'Union'},
  ];

  multiselectDBsIds: number[] = this.multiSelectOption.map(x => x.id);

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
      this.status.searchText = (params['q'] || '').split('|').filter(x => x.length > 0).join('\n');
      this.status.dataSourceIds = (params['db'] || '')
        .split(',')
        .map(x => Number(x))
        .filter(x => this.multiselectDBsIds.indexOf(x) > -1);
      if (this.status.dataSourceIds.length === 0) {
        this.status.dataSourceIds.push(0);
      }

      if (this.status.searchText !== '') {
        this.doSearch();
      }
    });
  }

  onDatabaseMultiselectAdded(event) {
    console.log('added ' + event);

    if (this.multiselectDBsIds.indexOf(event) === -1) {
      return;
    }

    if (event === 0) {
      this.status.dataSourceIds.length = 1;
      this.status.dataSourceIds[0] = 0;
    } else {
      const allDbIdx = this.status.dataSourceIds.indexOf(0);
      if (allDbIdx > -1) {
        this.status.dataSourceIds.splice(allDbIdx, 1);
      }
    }

    console.log('onDatabaseMultiselectAdded: ' + this.status.dataSourceIds);
  }

  onDatabaseMultiselectRemoved(event) {
    console.log('removed ' + event);

    if (this.multiselectDBsIds.indexOf(event) === -1) {
      return;
    }

    if (this.status.dataSourceIds.length === 0) {
      this.status.dataSourceIds.push(0);
    }

    console.log('onDatabaseMultiselectRemoved: ' + this.status.dataSourceIds);
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

  bestOnlyClicked() {
    this.status.bestOnly = !this.status.bestOnly;
  }
}
