export interface IForm {
    id: number;
    name: string;
}

class Form implements IForm {

    public id: number;
    public name: string;

    constructor(nameOrForm: string | IForm, name?: string, id?: number) {
        if (typeof nameOrForm === 'string') {
            this.name = nameOrForm;
            this.id = id || -1;
        } else {
            this.name = nameOrForm.name;
            this.id = nameOrForm.id;
        }
    }
}

export default Form;