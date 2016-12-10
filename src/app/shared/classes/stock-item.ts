import { Category } from './category';
import { StockQuantityManagerService } from '../managers/stock-quantity-manager.service';

export class StockItem {
    private _maxAmount: number;
    private _minAmount: number;
    private _currentAmount: number;
    private _unit: String;
    private _name: String;
    private _imageUrl: String;
    private _category: Category;

    constructor(
        private quantityManager: StockQuantityManagerService
    ) { }

    // Tell the manager that this item is in low-stock
    notifyManager() {
        this.quantityManager.setLowStock(this);
    }
    // Change the quantity of an item, which will also
    // notify the StockQuantityManager to re-check all stocks
    changeQuantity(amount: number) {
        this._currentAmount = amount;
        this.quantityManager.checkStock();
    }



    /* 
     * Getters and setters
     */
    get maxAmount(): number {
        return this._maxAmount;
    }
    set maxAmount(value: number) {
        this._maxAmount = value;
    }
    get minAmount(): number {
        return this._minAmount;
    }
    set minAmount(value: number) {
        this._minAmount = value;
    }
    get currentAmount(): number {
        return this._currentAmount;
    }
    get unit(): String {
        return this._unit;
    }
    set unit(value: String) {
        this._unit = value;
    }
    get name(): String {
        return this._name;
    }
    set name(value: String) {
        this._name = value;
    }
    get imageUrl(): String {
        return this._imageUrl;
    }
    set imageUrl(value: String) {
        this._imageUrl = value;
    }
    get category(): Category {
        return this._category;
    }
    set category(value: Category) {
        this._category = value;
    }

}
