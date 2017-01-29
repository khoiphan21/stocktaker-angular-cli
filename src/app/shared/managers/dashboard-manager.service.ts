import { Injectable } from '@angular/core';
import { AppSubject } from '../classes/app-subject';
import { AppObserver } from '../classes/app-observer';
import { StockQuantityManagerService } from './stock-quantity-manager.service';
import * as _ from 'underscore';

@Injectable()
export class DashboardManagerService implements AppSubject{
    // All the observers of the service
    private observers: AppObserver[]

    constructor(
        private quantityManager: StockQuantityManagerService
    ) { }

    addObserver(observer: AppObserver) {
        this.observers.push(observer);
    }

    notifyAll() {
        _.each(this.observers, observer => {
            observer.update();
        })
    }
}
