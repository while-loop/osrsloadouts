class SlotSchema {
    constructor(id = null, quantity = 1, row = 0, col = 0, info = null, slotType = null) {
        this.id = id;
        this.quantity = quantity;
        this.row = row;
        this.col = col;
        this.info = info;
        this.slotType = slotType; //
    }

    key() {
        return this.row + '-' + this.col;
    }

    reset() {
        this.id = null;
        this.info = null;
        this.quantity = 1;
    }

    toJSON() {
        let {id, quantity, row, col, info, slotType} = this;
        return {id, quantity, row, col, info, slotType}
    }

    static fromJSON(obj) {
        return new SlotSchema(obj.id, obj.quantity, obj.row, obj.col, obj.info, obj.slotType);
    }
}

export default SlotSchema;