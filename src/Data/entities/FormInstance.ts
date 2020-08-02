export interface IFormInstance {
    formID: number;
    formName: string;
    email: string;
    responseJson: string;
}

class FormInstance implements IFormInstance {

    public formID: number;
    public email: string;
    public responseJson: string;
    public formName: string;

    constructor(FormInstance: IFormInstance) {
        this.formID = FormInstance.formID;
        this.email = FormInstance.email;
        this.responseJson = JSON.parse(FormInstance.responseJson);
        this.formName = FormInstance.formName;
    }
}

export default FormInstance;