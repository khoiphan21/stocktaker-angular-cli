import { Task } from './task';
import { StockItem } from './stock-item';

/**
 * A task to be shown on the dashboard
 */
export class DashboardTask extends Task {
    private _item: StockItem;
    private _amount: number;

    /**
     * Get the item managed by this task
     * 
     * @return: the stock item in this task, which is the actual
     *          object representing that stock item
     */
    getItem(): StockItem {
        return this._item;
    }

    /**
     * Getters and setters
     */
    get amount(): number {
        return this._amount;
    }
    set amount(amount: number) {
        this._amount = amount;
    }
}
