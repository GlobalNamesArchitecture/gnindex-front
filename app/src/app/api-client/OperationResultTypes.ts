/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type name = {
  value: string,
  suppliedId?: string | null,
};

export type NameBrowserTripletsQueryVariables = {
  letter: string,
};

export type NameBrowserTripletsQuery = {
  nameBrowser_triplets:  Array< {
    value: string,
    active: boolean,
  } >,
};

export type DataSourceQueryVariables = {
  dataSourceIds?: Array< number > | null,
};

export type DataSourceQuery = {
  dataSourceById:  Array< {
    id: number,
    title: string,
    description: string | null,
  } >,
};

export type NameStringsQueryVariables = {
  searchTerm: string,
  page?: number | null,
  perPage?: number | null,
  dataSourceIds?: Array< number > | null,
};

export type NameStringsQuery = {
  nameStrings:  {
    page: number,
    perPage: number,
    resultsCount: number,
    names:  Array< {
      name:  {
        value: string,
      },
      canonicalName:  {
        value: string,
      } | null,
      matchedNames:  Array< {
        dataSource:  {
          id: number,
          title: string,
        },
        acceptedName:  {
          name:  {
            value: string,
          },
        } | null,
        classification:  {
          path: string | null,
          pathRanks: string | null,
        },
      } >,
    } >,
  },
};

export type NameResolverQueryVariables = {
  names: Array< name >,
  dataSourceIds?: Array< number > | null,
  bestMatchOnly?: boolean | null,
};

export type NameResolverQuery = {
  nameResolver:  {
    responses:  Array< {
      suppliedInput: string | null,
      total: number,
      results:  Array< {
        name:  {
          value: string,
        },
        dataSource:  {
          id: number,
          title: string,
        },
        classification:  {
          path: string | null,
        },
        acceptedName:  {
          name:  {
            value: string,
          },
        } | null,
        matchType:  {
          kind: string,
          score: number,
        },
      } >,
    } >,
  },
};
