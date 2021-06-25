interface GraphQLModel {
  _id?: string;
  __typename?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export interface User extends GraphQLModel {
  name?: string;
}

export interface DocumentModel {
  id?: string;
  src?: string | ArrayBuffer; // url
  name?: string; // name
}
