export interface IMongoDbConnectionProps {
  uri: string;
  dbName: string;
}

export interface IDataType {
  [key: string]: string | IDataType | IDataType[];
}

export interface IMongoSchemaResponse {
  schema: IDataType;
  collections: string[];
}

export interface getDbSchema {
  (props: IMongoDbConnectionProps): Promise<IMongoSchemaResponse>;
}
