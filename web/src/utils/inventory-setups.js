const slots = [
    "head", "cape", "neck", "weapon", "body", "shield", null, "legs", null, "hands", "feet", null, "ring", "ammo"
]

export function loadout2setup(loadout) {
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
        if (slot != null) {
            const e_s = loadout.equipment[slot]
            console.log(e_s)
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

    console.log(eq)

    return {
        inventory: invy,
        equipment: eq,
        rune_pouch: [{
            id: -1,
            name: null,
            quantity: 0,
        }, {
            id: -1,
            name: null,
            quantity: 0,
        }, {
            id: -1,
            name: null,
            quantity: 0,
        }]
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

    return {
        equipment: equipment,
        inventory: inventory,
        title: setup.name,
    }

}
