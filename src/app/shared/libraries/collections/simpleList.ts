// A simple typed list
export class SimpleList<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    remove(value: T): void {
        let itemIndex = this.items.indexOf(value);

        this.items.splice(itemIndex, 1);
    }
}
