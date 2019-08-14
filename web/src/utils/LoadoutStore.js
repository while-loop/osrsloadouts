import axios from "axios";

class LoadoutStore {


    static baseUrl = 'https://api.osrsloadouts.io';


    static async getLoadout(uuid) {
        if (uuid == null) {
            return null;
        }

        let url = this.baseUrl + `/items-json/${itemId}.json`;

        return axios.get(url);
    }
}


export default LoadoutStore;
