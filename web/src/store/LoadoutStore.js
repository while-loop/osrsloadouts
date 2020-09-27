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

    static async update(id, loadout) {
        let url = BASE_URL + `/loadouts/${id}`;
        return axios.put(url, loadout);
    }

    static async delete(id) {
        let url = BASE_URL + `/loadouts/${id}`;
        console.log("delete uyrl", url)
        return axios.delete(url);
    }

    static async browseLoadouts(page, limit, sort, filter) {
        let url = BASE_URL + `/loadouts`;
        return axios.get(url, {
            params: {
                page: page,
                limit: limit,
                sort: sort,
                filter: filter,
            }
        });
    }

    static async getLoadoutsByUid(uid, page, limit, sort, filter) {
        if (uid == null) {
            return null;
        }

        let url = BASE_URL + `/loadouts/user/${uid}`;
        return axios.get(url, {
            params: {
                page: page,
                limit: limit,
                sort: sort,
                filter: filter,
            }
        });
    }
}

export default LoadoutStore;
