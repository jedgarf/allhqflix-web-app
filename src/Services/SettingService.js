import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.base_url_v1;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const valid_apis = async (is_active = 1, id = null) => {

    var idString = "";

    if (id != null) {
        idString = `/${id}`;
    }

    const results = await axios.get(url + "/api_keys" + idString + "?is_active=" + is_active);
    return results;
};

const receiveEmail = async (email, subject, message) => {
    
    const formData = {
        from: `ALLHQFLIX Viewer <${email}>`,
        subject: subject,
        message: message,
    };

    try {
        const response = await axios.post(`${url}/mail/receive`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const menus = async ({ queryKey }) => {

    const [_key, { type, is_active, id }] = queryKey;

    var idString = "";

    if (id != null) {
        idString = `/${id}`;
    }

    const results = await axios.get(url + "/menus" + idString + "?type=" + type + "&is_active=" + is_active);
    return results;
};

const sub_menus = async ({ queryKey }) => {

    const [_key, { is_active, id }] = queryKey;

    var idString = "";

    if (id != null) {
        idString = `/${id}`;
    }

    const results = await axios.get(url + "/sub_menus" + idString + "?is_active=" + is_active);
    return results;
};

export {valid_apis, receiveEmail, menus, sub_menus};