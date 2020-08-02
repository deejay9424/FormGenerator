export interface IFormField {
    id: number;
    key: string;
    text: string;
    value?: string;
    type: string;
}

class FormField implements IFormField {

    public id: number;
    public key: string;
    public text: string;
    public value?: string;
    public type: string;

    constructor(FormField: IFormField) {
        this.id = FormField.id;
        this.key = FormField.key;
        this.text = FormField.text;
        this.value = FormField.value;
        this.type = FormField.type;
    }
}

export default FormField;