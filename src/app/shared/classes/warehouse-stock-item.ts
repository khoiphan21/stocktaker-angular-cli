import { StockQuantityManagerService } from '../managers/stock-quantity-manager.service';

export class WarehouseStockItem {
    // The id is based on the name of the item, but in lowercase
    _id: string;
    maxAmount: number;
    minAmount: number;
    currentAmount: number;
    unit: string;
    name: string;
    imageURL: string;
    categoryId: string;
    isOrdered: boolean; // Whether this item has been ordered for re-stocking

    quantityManager: StockQuantityManagerService;

    constructor(
        name: string,
        categoryId: string,
        maxAmount: number,
        minAmount: number,
        unit: string,
        currentAmount: number = 0,
        isOrdered: boolean = false
    ) {
        this.name = name;
        this.categoryId = categoryId;
        this.maxAmount = maxAmount;
        this.minAmount = minAmount;
        this.unit = unit;
        this.currentAmount = currentAmount;
        this.isOrdered = isOrdered;

        // create an id for the item based on the name
        this._id = name.toLowerCase();
    }

    // Tell the manager that this item is in low-stock
    notifyManager() {
        if (this.quantityManager != null) {
            this.quantityManager.setLowStock(this);
        }
    }
    // Change the quantity of an item
    changeQuantity(amount: number) {
        if (this.quantityManager != null) {
            this.currentAmount = amount;
        }
    }


}
