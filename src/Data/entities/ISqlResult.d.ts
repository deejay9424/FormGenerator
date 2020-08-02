export interface ISqlResult {
    recordsets: Array<Array<any>>;
    recordset: Array<any>
    output: object;
    rowsAffected: Array<number>;
    returnValue: number;
}