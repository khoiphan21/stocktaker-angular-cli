export abstract class Task {
    ordered: boolean;
    arrived: boolean;

    isComplete(): boolean {
        return this.ordered && this.arrived;
    }
}
