export class Category {
    name: string;
    sectionId: string;
    isContentShown: boolean = false;

    delete() {

    }

    constructor(
        name: string,
        sectionId: string
    ) {
        this.name = name;
        this.sectionId = sectionId;
    }


}
