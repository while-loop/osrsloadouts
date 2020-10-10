import axios from "axios";
import {BASE_URL} from "../utils/base";

class LoadoutStore {
    static async get(id) {
        if (id == null) {
            return null;
        }

        let url = BASE_URL + `/loadouts/${id}`;
        return axios.get(url);
    }

    static async create(loadout) {
        let url = BASE_URL + `/loadouts`;
        return axios.post(url, loadout);
    }

    static async update(loadout) {
        let url = BASE_URL + `/loadouts/${loadout.id}`;
        return axios.put(url, loadout);
    }

    static async delete(id) {
        let url = BASE_URL + `/loadouts/${id}`;
        console.log("delete uyrl", url)
        return axios.delete(url);
    }

    static async getLoadouts(url, page, limit, sort, filter) {
        return axios.get(url, {
            params: {
                ...filter,
                page: page,
                limit: limit,
                sort: sort,
            }
        });
    }

    static async browseLoadouts(page, limit, sort, filter) {
        return LoadoutStore.getLoadouts( BASE_URL + `/loadouts`, page, limit, sort, filter)

    }

    static async getLoadoutsByUid(uid, page, limit, sort, filter) {
        if (uid == null) {
            return null;
        }

        return this.getLoadouts(BASE_URL + `/loadouts/user/${uid}`, page, limit, sort, filter)
    }

    static async favoriteLoadout(uid, fav) {
        if (uid == null) {
            return null;
        }

        let url = BASE_URL + `/loadouts/${uid}/favorite`;
        return axios.post(url, {
            favorite: fav,
        });
    }

    static async copyLoadout(uid) {
        if (uid == null) {
            return null;
        }

        let url = BASE_URL + `/loadouts/${uid}/copy`;
        return axios.post(url, {});
    }
}

export default LoadoutStore;
