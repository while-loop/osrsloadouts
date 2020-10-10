const slots = [
    "head", "cape", "neck", "weapon", "body", "shield", null, "legs", null, "hands", "feet", null, "ring", "ammo"
]

export function loadout2setup(loadout, description) {
    const invy = []
    const eq = []
    for (let i = 0; i < loadout.inventory.length; i++) {
        for (let j = 0; j < loadout.inventory[i].length; j++) {
            const item = loadout.inventory[i][j];
            if (item.id != null) {
                invy.push({
                    id: item.id,
                    name: "",
                    quantity: item.quantity,
                })
            } else {
                invy.push({
                    id: -1,
                    name: null,
                    quantity: 0,
                })
            }
        }
    }
    const empty = {
        id: -1,
        name: null,
        quantity: 0
    }
    slots.forEach(slot => {
        let e = empty;
        if (slot != null && loadout.equipment != null && slot in loadout.equipment) {
            const e_s = loadout.equipment[slot]
            if (e_s.id != null) {
                e = {
                    id: e_s.id,
                    quantity: e_s.quantity,
                    name: "",
                };
            }
        }
        eq.push(e)
    })

    const rp = new Array(3);
    for (let i = 0; i < loadout.rune_pouch.length; i++) {
        let e = empty;
        const item = loadout.rune_pouch[i]
        if (item.id != null) {
            e = {
                id: item.id,
                name: "",
                quantity: item.quantity,
            }
        }

        rp[i] = e
    }

    return {
        inventory: invy,
        equipment: eq,
        rune_pouch: rp,
        notes: description,
    }
}

export function setup2loadout(setup) {
    const equipment = {
        head: {id: null, quantity: 0},
        cape: {id: null, quantity: 0},
        neck: {id: null, quantity: 0},
        ammo: {id: null, quantity: 0},
        weapon: {id: null, quantity: 0},
        body: {id: null, quantity: 0},
        shield: {id: null, quantity: 0},
        legs: {id: null, quantity: 0},
        hands: {id: null, quantity: 0},
        feet: {id: null, quantity: 0},
        ring: {id: null, quantity: 0},
    }

    const inventory = new Array(7);
    for (let i = 0; i < inventory.length; i++) {
        inventory[i] = new Array(4);
        for (let j = 0; j < inventory[i].length; j++) {
            inventory[i][j] = {id: null, quantity: 0}
        }
    }

    for (let i = 0; i < setup.inventory.length; i++) {
        let row = Math.floor(i / 4)
        let col = i % 4
        let item = setup.inventory[i]
        if (item == null || item.id === -1) {
            item = {id: null, quantity: 0}
        } else {
            item = {id: item.id, quantity: item.quantity}
        }
        inventory[row][col] = item;
    }

    for (let i = 0; i < setup.equipment.length; i++) {
        let slot = slots[i];
        if (slot == null) {
            continue;
        }

        let item = setup.equipment[i]
        if (item != null && item.id !== -1) {
            equipment[slot] = {id: item.id, quantity: item.quantity}
        }
    }

    const runePouch = new Array(3);

    for (let i = 0; i < setup.rune_pouch.length; i++) {
        let item = setup.rune_pouch[i]
        if (item == null || item.id === -1) {
            runePouch[i] = {id: null, quantity: 0}
        } else {
            runePouch[i] = {id: item.id, quantity: item.quantity}
        }
    }

    return {
        equipment: equipment,
        inventory: inventory,
        rune_pouch: runePouch,
        title: setup.name,
        description: setup.notes,
    }

}
