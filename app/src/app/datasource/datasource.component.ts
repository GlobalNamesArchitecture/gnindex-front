import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {DataSourceQuery, DataSourceQueryVariables} from '../api-client/OperationResultTypes';
import * as _ from 'lodash';

@Component({
  selector: 'app-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnInit {

  protected Lo = _;
  protected dataSourceId: number[];
  protected dataSourceQry: DataSourceQuery = undefined;

  private DATASOURCE_QUERY = gql`
    query DataSource($dataSourceIds: [Int!]) {
      dataSourceById(dataSourceIds: $dataSourceIds) {
        id
        title
        description
      }
    }`;

  constructor(private _route: ActivatedRoute,
              private _apollo: Apollo) {
    console.log('loading database component');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.dataSourceId = _.isUndefined(params['id']) ? Array<number>() : [+params['id']];
      console.log(params['id']);

      this._apollo.query<DataSourceQuery, DataSourceQueryVariables>({
        query: this.DATASOURCE_QUERY,
        variables: {dataSourceIds: this.dataSourceId}
      }).subscribe(({data}) => {
        console.log(data);
        this.dataSourceQry = data;
      });
    });
  }

  descriptionPretty(description: string) {
    const maxLength = 150;
    if (!_.isNull(description) && description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  }
}
