import { Section } from './section';
import { SectionManagerService } from '../managers/section-manager.service';

export class Category {
    private _name: string;
    private _section: Section;

    getName(): string {
        return this._name;
    }
    changeName(name: string) {
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
        name: string,
        section: Section
    ) {
        this._name = name;
        this._section = section;
    }


}
