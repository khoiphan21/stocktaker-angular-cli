import { Section } from './section';
import { SectionManagerService } from '../managers/section-manager.service';

export class Category {
    private _name: String;
    private _section: Section;

    getName(): String {
        return this._name;
    }
    changeName(name: String) {
        this._name = name;
    }
    get getSection(): Section {
        return this._section;
    }
    set changeSection(section: Section) {
        this._section = section;
    }

    delete() {

    }

    constructor(
        private manager: SectionManagerService,
        name: String,
        section: Section
    ) {
        this._name = name;
        this._section = section;
    }


}
