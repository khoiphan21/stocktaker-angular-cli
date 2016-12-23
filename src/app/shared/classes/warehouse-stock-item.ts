import { StockQuantityManagerService } from '../managers/stock-quantity-manager.service';

export class WarehouseStockItem {
    private itemMaxAmount: number;
    private itemMinAmount: number;
    private itemCurrentAmount: number;
    private itemUnit: String;
    private itemName: String;
    private itemImageURL: String;
    private itemCategoryId: string;
    private itemQuantityManager: StockQuantityManagerService;

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
            this.itemCurrentAmount = amount;
            this.quantityManager.checkStock();
        }
    }



    /* 
     * Getters and setters
     */
    get maxAmount(): number {
        return this.itemMaxAmount;
    }
    set maxAmount(value: number) {
        this.itemMaxAmount = value;
    }
    get minAmount(): number {
        return this.itemMinAmount;
    }
    set minAmount(value: number) {
        this.itemMinAmount = value;
    }
    get currentAmount(): number {
        return this.itemCurrentAmount;
    }
    get unit(): String {
        return this.itemUnit;
    }
    set unit(value: String) {
        this.itemUnit = value;
    }
    get name(): String {
        return this.itemName;
    }
    set name(value: String) {
        this.itemName = value;
    }
    get imageUrl(): String {
        return this.itemImageURL;
    }
    set imageUrl(value: String) {
        this.itemImageURL = value;
    }
    get categoryId(): string {
        return this.itemCategoryId;
    }
    set categoryId(value: string) {
        this.itemCategoryId = value;
    }
    get quantityManager(): StockQuantityManagerService {
        return this.itemQuantityManager;
    }
    set quantityManager(value: StockQuantityManagerService) {
        this.itemQuantityManager = value;
    }

}
