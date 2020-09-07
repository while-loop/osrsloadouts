import axios from "axios";

class UserStore {
    static baseUrl = process.env.REACT_APP_API_URL;

    static async get(id) {
        if (id == null) {
            return null;
        }

        let url = this.baseUrl + `/users/${id}`;
        return axios.get(url);
    }

    static async getByUsername(username) {
        if (username == null) {
            return null;
        }

        let url = this.baseUrl + `/users/username/${username}`;
        return axios.get(url);
    }

    static async getLoadoutsByUid(uid, page, limit, sort) {
        if (uid == null) {
            return null;
        }

        let url = this.baseUrl + `/users/${uid}/loadouts`;
        return axios.get(url, {
            params: {
                page: page,
                limit: limit,
                sort: sort,
            }
        });
    }

    static async update(id, properties) {
        if (properties == null) {
            return null;
        }

        let url = this.baseUrl + `/users/${id}`;
        return axios.put(url, properties);
    }

    static async create(properties) {
        if (properties == null) {
            return null;
        }

        let url = this.baseUrl + `/users`;
        return axios.post(url, properties);
    }
}

export default UserStore;
