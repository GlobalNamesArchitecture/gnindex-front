import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from "graphql-tag";
import {
  DataSourceQuery, DataSourceQueryVariables, NameResolverQuery,
  NameResolverQueryVariables
} from "../api-client/OperationResultTypes";

@Component({
  selector: 'app-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnInit {

  dataSourceId: number;
  dataSourceInfo = {};

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
      this.dataSourceId = +params['id'];

      this._apollo.query<DataSourceQuery, DataSourceQueryVariables>({
        query: this.DATASOURCE_QUERY,
        variables: {dataSourceIds: [this.dataSourceId]}
      }).subscribe(({data}) => {
        console.log(data);
        this.dataSourceInfo = data['dataSourceById'][0];
      });
    });
  }

}
