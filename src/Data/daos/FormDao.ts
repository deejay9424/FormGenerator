import { IForm } from '../entities/Form';
import { getPool } from '../connector';
import { ISqlResult } from '../entities/ISqlResult';
import FormInstance, { IFormInstance } from '../entities/FormInstance';

export interface IFormDao {
    upsert(form: IForm): boolean;
}

class FormDao implements IFormDao {
    public dbConnection = getPool('default');

    public upsert(form: IForm): boolean {
        // call sp to upsert form
        return false;
    };

    public async getFormInstances(email: string): Promise<Array<IFormInstance>> {
        let results: Array<IFormInstance> = new Array<IFormInstance>();
        const qResult: ISqlResult = await this.dbConnection.request()
            .input("Email", email)
            .execute("GetFormInstance");

        qResult.recordset.forEach((record) => {
            let instance: FormInstance = new FormInstance(record);
            results.push(instance);
        });

        return results;
    }
}

export default FormDao;