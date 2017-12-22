/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type name = {
  value: string,
  suppliedId?: string | null,
};

export type NameStringsQueryVariables = {
  searchTerm: string,
};

export type NameStringsQuery = {
  nameStrings:  Array< {
    name:  {
      id: string,
      value: string,
    },
    canonicalName:  {
      id: string,
      value: string,
    } | null,
    classification:  {
      path: string | null,
    },
  } >,
};

export type NameResolverQueryVariables = {
  names: Array< name >,
};

export type NameResolverQuery = {
  nameResolver:  {
    responses:  Array< {
      total: number,
    } >,
  },
};
