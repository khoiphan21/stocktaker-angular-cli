import { AppObserver } from './app-observer';
export interface AppSubject {
    addObserver(observer: AppObserver);
    notifyAll();
}