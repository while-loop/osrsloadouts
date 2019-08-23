import axios from "axios";

class ItemStore {

    static equipmentTypes = [
        "2h", "ammo", "body", "cape", "feet", "hands", "head", "legs", "neck", "ring", "shield", "weapon"
    ];
    static baseUrl = 'https://www.osrsbox.com/osrsbox-db';
    static allPath = '/items-complete.json';

    static items = {};
    static fetching = false;

    static _setItem(key, data) {
        let item = {
            time: Date.now(),
            data: data,
        };

        localStorage.setItem(key, JSON.stringify(item));
    }

    /**
     *
     * @param key localstorage key
     * @param expires TTL in seconds
     * @private
     */
    static _getItem(key, expires) {
        let item = localStorage.getItem(key);
        if (item == null) {
            return null;
        }
        let diff = Date.now() - item.time;
        if (diff >= (expires * 1000)) {
            localStorage.removeItem(key);
            return null;
        }

        return item.data
    }

    static async getAll() {
        if (Object.keys(this.items).length > 0) {
            return this.items;
        }

        while (this.fetching) {
            await sleep(50);
            if (Object.keys(this.items).length > 0) {
                return this.items;
            }
        }

        this.fetching = true;
        await axios.get(ItemStore.baseUrl + ItemStore.allPath)
            .then(res => {
                this.items = Object.values(res.data).filter(i => {
                    if (i.placeholder || i.noted) return false;
                    if (i.linked_id_noted == null && i.linked_id_placeholder == null) return false;
                    return true;
                });
            })
            .catch(reason => {
                console.log("failed to get all items", reason);
            });
        this.fetching = false;
        return this.items;
    }

    /**
     *
     * @param type
     */
    static async getEquipmentType(type) {
        if (type == null) {
            console.log("null equipment type:", type);
            return [];
        }

        type = type.toLowerCase();
        if (ItemStore.equipmentTypes.indexOf(type) === -1) {
            console.log("invalid equipment type:", type);
            return [];
        }

        let wants = [type];
        if (type === '2h' || type === 'weapon') {
            wants = ['2h', 'weapon']
        }

        let all = await this.getAll();
        let allItems = all.filter(item => item.equipment && wants.indexOf(item.equipment.slot) !== -1);
        return allItems;
    }

    static async getItemInfo(itemId) {
        if (itemId == null) {
            console.log("null item id");
            return null;
        }

        let url = this.baseUrl + `/items-json/${itemId}.json`;
        return axios.get(url);
    }

    static imgUrl(id) {
        if (id == null) {
            return '';
        }
        return `https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`;
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};


export default ItemStore;
