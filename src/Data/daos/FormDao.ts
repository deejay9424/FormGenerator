import { IForm } from '../entities/Form';
import { getPool } from '../connector';
import { ISqlResult } from '../entities/ISqlResult';
import FormInstance, { IFormInstance } from '../entities/FormInstance';
import FormField from '../entities/FormField';

export interface IFormDao {
    /**
     * Add new Form
     * @param form 
     */
    addNewForm(form: IForm): Promise<boolean>;

    /**
     * Get form Instances for an email ID
     * @param email 
     */
    getFormInstances(email: string): Promise<Array<IFormInstance>>;

    /**
     * Add Fields to a form
     * @param formID 
     * @param formFields 
     */
    addFieldsToForm(formID: number,formFields: Array<FormField>): Promise<boolean>;

    /**
     * Add a new Form Instance
     * @param formInstance 
     */
    addFormInstance(formInstance: IFormInstance): Promise<boolean>;
}

class FormDao implements IFormDao {
    public dbConnection = getPool('default');

    public async addNewForm(form: IForm): Promise<boolean> {
        let result: number = 0;
        const qResult: ISqlResult = await this.dbConnection.request()
            .input("FormName", form.name)
            .execute("AddNewForm");
        return (result != qResult.rowsAffected[0]);
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
    };

    public async addFieldsToForm(formID: number,formFields: Array<FormField>): Promise<boolean> {
        let result: Array<number> = new Array<number>();
        formFields.forEach(async record => {
            const qResult: ISqlResult = await this.dbConnection.request()
            .input("FormID", formID)
            .input("FieldKey", record.key.trim().toUpperCase())
            .input("FieldText", record.text.trim())
            .input("Type", record.type.trim())
            .execute("AddFieldsToForm");

            result.push(qResult.rowsAffected[0]);
        });
        return (result.findIndex(x=>x === 0) === -1);
    };

    public async addFormInstance(formInstance: IFormInstance): Promise<boolean> {
        let result: number = 0;
        const qResult: ISqlResult = await this.dbConnection.request()
            .input("FormID", formInstance.formID)
            .input("Email", formInstance.email)
            .input("ResponseJSON", formInstance.responseJson)
            .execute("AddFormInstance");
        return (result != qResult.rowsAffected[0]);
    }
}

export default FormDao;