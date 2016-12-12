import { Section } from './section';
import { StockItemManagerService } from '../managers/stock-item-manager.service';

export class Category {
    private _name: string;
    private _section: Section;

    get name(): string {
        return this._name;
    }
    set name(name: string) {
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
        private manager: StockItemManagerService,
        name: string,
        section: Section
    ) {
        this._name = name;
        this._section = section;
    }


}
