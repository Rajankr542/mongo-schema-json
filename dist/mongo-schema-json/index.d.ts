import { IDataType, IMongoDbConnectionProps } from '../types';
export declare const getDbSchema: ({ uri, dbName }: IMongoDbConnectionProps) => Promise<{
    schema: IDataType;
    collections: string[];
}>;
//# sourceMappingURL=index.d.ts.map