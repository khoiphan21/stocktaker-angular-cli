import { SectionManagerService } from '../managers/section-manager.service';

export class Section {
    private _name: String;


    getName(): String {
        return this._name;
    }
    changeName(value: String) {
        this._name = value;
    }

    constructor(private manager: SectionManagerService) {

    }
}
