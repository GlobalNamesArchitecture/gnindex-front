/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type name = {
  value: string,
  suppliedId?: string | null,
};

export type NameStringsQueryVariables = {
  searchTerm: string,
  page?: number | null,
  perPage?: number | null,
};

export type NameStringsQuery = {
  nameStrings:  {
    page: number,
    perPage: number,
    resultsCount: number,
    results:  Array< {
      name:  {
        id: string,
        value: string,
      },
      canonicalName:  {
        id: string,
        value: string,
      } | null,
      dataSources:  Array< {
        id: number,
        title: string,
      } >,
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
  },
};

export type NameResolverQueryVariables = {
  names: Array< name >,
};

export type NameResolverQuery = {
  nameResolver:  {
    responses:  Array< {
      suppliedInput: string | null,
      results:  Array< {
        name:  {
          value: string,
        },
        canonicalName:  {
          value: string,
        } | null,
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
      total: number,
    } >,
  },
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
