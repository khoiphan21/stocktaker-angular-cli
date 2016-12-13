import { Category } from './category';
import { StockQuantityManagerService } from '../managers/stock-quantity-manager.service';

export class WarehouseStockItem {
    private _maxAmount: number;
    private _minAmount: number;
    private _currentAmount: number;
    private _unit: String;
    private _name: String;
    private _imageUrl: String;
    private _categoryId: string;
    private _quantityManager: StockQuantityManagerService;

    constructor(
        name: string,
        categoryId: string,
        maxAmount: number,
        minAmount: number,
        unit: string
    ) {
        this.name = name;
        this.categoryId = categoryId;
        this.maxAmount = maxAmount;
        this.minAmount = minAmount;
        this.unit = unit;
    }

    // Tell the manager that this item is in low-stock
    notifyManager() {
        if (this.quantityManager != null) {
            this.quantityManager.setLowStock(this);
        }
    }
    // Change the quantity of an item, which will also
    // notify the StockQuantityManager to re-check all stocks
    changeQuantity(amount: number) {
        if (this.quantityManager != null) {
            this._currentAmount = amount;
            this.quantityManager.checkStock();
        }
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
    get categoryId(): string {
        return this._categoryId;
    }
    set categoryId(value: string) {
        this._categoryId = value;
    }
    get quantityManager(): StockQuantityManagerService {
        return this._quantityManager;
    }
    set quantityManager(value: StockQuantityManagerService) {
        this._quantityManager = value;
    }

}
