import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/empty';
import {SearchStatus, SearchStatusService} from '../search-box/search-box.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NameStringsQuery, NameStringsQueryVariables} from '../api-client/OperationResultTypes';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-name-strings-search',
  templateUrl: './name-strings-search.component.html',
  styleUrls: ['./name-strings-search.component.scss'],
  providers: [ApiClientService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameStringsSearchComponent implements OnInit {
  itemsPerPage = 30;

  searchParamName = 'q';
  pageNumberParamName = 'pn';
  namesWithSameCanonicalName = [];

  searchStatus: SearchStatus;
  response = {};
  pageNumber = 1;
  total: number;
  loading: boolean;
  selectedNameIdx = 0;

  apiClientService: ApiClientService;
  results: Observable<any[]>;

  private NAME_STRINGS_QUERY = gql`
    query NameStrings($searchTerm: String!, $page: Int, $perPage: Int, $dataSourceIds: [Int!]) {
      nameStrings(searchTerm: $searchTerm, page: $page, perPage: $perPage, dataSourceIds: $dataSourceIds) {
        page
        perPage
        resultsCount
        names {
          name {
            value
          }
          canonicalName {
            value
          }
          matchedNames {
            dataSource {
              id
              title
            }
            acceptedName {
              name {
                value
              }
            }
            classification {
              path
              pathRanks
            }
          }
        }
      }
    }`;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(apiClientService: ApiClientService,
              private _apollo: Apollo,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _searchStatusService: SearchStatusService,
              private _modalService: NgbModal,
              private _changeDetectorRef: ChangeDetectorRef) {
    this.apiClientService = apiClientService;
    this.searchStatus = _searchStatusService.searchStatusLatest();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.pageNumber = +(params[this.pageNumberParamName] || 1);
    });
    this._searchStatusService.searchStatus$.subscribe(searchStatus => {
      this.searchStatus = searchStatus;
      this.goSearch(searchStatus);
      if (this.searchStatus.searchText && this.searchStatus.searchText.length > 0) {
        this.update(this.pageNumber);
      }
    });
    if (this.searchStatus.searchText && this.searchStatus.searchText.length > 0) {
      this.update(this.pageNumber);
    }
  }

  goSearch(searchStatus: SearchStatus) {
    console.log('handling search:');
    console.log(searchStatus);

    if (searchStatus.searchText === '') {
      return;
    }
    const queryParams: Params = Object.assign({}, this._activatedRoute.snapshot.queryParams);
    this.selectItem(0);
    queryParams[this.searchParamName] = searchStatus.searchText;
    queryParams['db'] = searchStatus.dataSourceIds.filter(x => x !== 0).join(',');
    queryParams['bo'] = searchStatus.bestOnly;
    this._router.navigate(
      [this._activatedRoute.snapshot.url.join('/')],
      {queryParams: queryParams}
    );
  }

  update(page: number) {
    this.loading = true;
    this.response = {};

    this.results =
      this.searchNameStrings(this.searchStatus.searchText, page, this.itemsPerPage)
        .map((response) => {
          this.loading = false;
          this.pageNumber = page;
          this.response = response;
          this.total = this.response['resultsCount'];
          console.log('name-strings results:');
          console.log(this.response);
          this.selectItem(0);
          this._changeDetectorRef.markForCheck();
          return this.response['names'];
        });

    this._changeDetectorRef.markForCheck();
  }

  selectItem(idx: number) {
    this.selectedNameIdx = idx;
    this.namesWithSameCanonicalName = [];

    if (this.resultIsNotEmpty()) {
      const result = this.response['names'][this.selectedNameIdx];
      const query = `can:${result.canonicalName.value}`;
      console.log('searching for canonical name: ' + query);
      this.searchNameStrings(query, 1, this.itemsPerPage)
        .subscribe((response) => {
          this.namesWithSameCanonicalName = response['names'].map((r) => r['name'].value);
          console.log(this.namesWithSameCanonicalName);
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  selectedResult() {
    return this.response['names'][this.selectedNameIdx];
  }

  closingResultCount() {
    return Math.min(this.response['resultsCount'], this.itemsPerPage * this.pageNumber);
  }

  resultJsonString() {
    const jsonStr = JSON.stringify(this.response, undefined, 2);
    console.log(jsonStr);
    return jsonStr;
  }

  openModal(content) {
    this._modalService.open(content, {size: 'lg', windowClass: 'modal-xxl'})
      .result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${NameStringsSearchComponent.getDismissReason(reason)}`);
    });
  }

  resultIsNotEmpty() {
    return this.response && this.response['resultsCount'] > 0;
  }

  namesByDatasource(result) {
    console.log('====================');
    console.log(result);

    if (_.isEmpty(result.matchedNames)) {
      return [];
    }

    const resultArr = [];
    let accumulatedMatchedNames = [];
    let currentDatasource = result.matchedNames[0].dataSource;
    for (const matchedName of result.matchedNames) {
      if (matchedName.dataSource.id !== currentDatasource.id) {
        resultArr.push({
          dataSource: currentDatasource,
          results: accumulatedMatchedNames,
        });
        currentDatasource = matchedName.dataSource;
        accumulatedMatchedNames = [];
      }
      accumulatedMatchedNames.push(matchedName);
    }
    resultArr.push({
      dataSource: currentDatasource,
      results: accumulatedMatchedNames,
    });

    return resultArr;
  }


  private searchNameStrings(searchText: string, pageNumber: number, itemsPerPage: number) {
    console.log(`searchText: ${searchText}, pageNumber: ${pageNumber},
                 dataSourceIds: ${this.searchStatus.dataSourceIds}`);
    return this._apollo.query<NameStringsQuery, NameStringsQueryVariables>({
      query: this.NAME_STRINGS_QUERY,
      variables: {
        searchTerm: searchText,
        page: pageNumber - 1,
        perPage: itemsPerPage,
        dataSourceIds: this.searchStatus.dataSourceIds.filter(x => x !== 0),
      }
    }).map(({data}) => data.nameStrings);
  }
}
