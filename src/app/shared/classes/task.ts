export abstract class Task {
    private _isComplete: boolean;

    get isComplete(): boolean {
        return this._isComplete;
    }
    set isComplete(value: boolean) {
        this._isComplete = value;
    }
}
