import axios from "axios";
import {BASE_URL} from "../utils/base";

class UserStore {
    static baseUrl = process.env.REACT_APP_API_URL;

    static async get(id) {
        if (id == null) {
            return null;
        }

        let url = BASE_URL + `/users/${id}`;
        return axios.get(url);
    }

    static async getByUsername(username) {
        if (username == null) {
            return null;
        }

        let url = BASE_URL + `/users/username/${username}`;
        return axios.get(url);
    }

    static async getLoadoutsByUid(uid, page, limit, sort, filter) {
        if (uid == null) {
            return null;
        }

        let url = BASE_URL + `/users/${uid}/loadouts`;
        return axios.get(url, {
            params: {
                page: page,
                limit: limit,
                sort: sort,
                filter: filter,
            }
        });
    }

    static async update(id, properties) {
        if (properties == null) {
            return null;
        }

        let url = BASE_URL + `/users/${id}`;
        return axios.put(url, properties);
    }

    static async create(properties) {
        if (properties == null) {
            return null;
        }

        let url = BASE_URL + `/users`;
        return axios.post(url, properties);
    }
}

export default UserStore;
