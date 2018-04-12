export interface IRegexpDoc {
    _id: string;
    name: string;
    value: string;
    link: string;
}
export class RegexpDoc implements IRegexpDoc {
    _id = '';
    name = '';
    value = '';
    link = '';
}
