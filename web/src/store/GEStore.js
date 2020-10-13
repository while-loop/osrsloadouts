import axios from "axios";
import {BASE_URL} from "../utils/base";

const BASE_GE_URL = BASE_URL + "/ge"

class GEStore {

    static async get(itemId) {
        if (itemId == null) {
            console.log("null item id");
            return null;
        }

        let url = BASE_GE_URL + `/id/${itemId}`;
        return axios.get(url);
    }
}


export default GEStore;
