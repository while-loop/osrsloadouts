import axios from "axios";

class LoadoutStore {
    static baseUrl = process.env.REACT_APP_API_URL;

    static async get(id) {
        if (id == null) {
            return null;
        }

        let url = this.baseUrl + `/loadouts/${id}`;
        return axios.get(url);
    }

    static async create(loadout) {
        let url = this.baseUrl + `/loadouts`;
        return axios.post(url, loadout);
    }

    static async update(id, loadout) {
        let url = this.baseUrl + `/loadouts/${id}`;
        return axios.put(url, loadout);
    }

    static async delete(id) {
        let url = this.baseUrl + `/loadouts/${id}`;
        return axios.delete(url);
    }

    static async browseLoadouts(page, limit, sort, filter) {
        let url = this.baseUrl + `/loadouts`;
        return axios.get(url, {
            params: {
                page: page,
                limit: limit,
            }
        });
    }
}

export default LoadoutStore;
