import { Section } from './section';
import { StockItemManagerService } from '../managers/stock-item-manager.service';

export class Category {
    private _name: string;
    private _sectionId: string;

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
    get sectionId(): string {
        return this._sectionId;
    }
    set sectionId(sectionId: string) {
        this._sectionId = sectionId;
    }

    delete() {

    }

    constructor(
        name: string,
        sectionId: string
    ) {
        this._name = name;
        this._sectionId = sectionId;
    }


}
