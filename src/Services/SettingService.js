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
        message: email + "<br/>" + message,
    };

    try {
        const response = await axios.post(`${url}/mail/receive`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// unused ================================================================================================================
const menuss = async ({ queryKey }) => {

    const [_key, { type, is_active, id }] = queryKey;

    var idString = "";

    if (id != null) {
        idString = `/${id}`;
    }

    const results = await axios.get(url + "/menus" + idString + "?type=" + type + "&is_active=" + is_active);
    return results;
};

const sub_menuss = async ({ queryKey }) => {

    const [_key, { is_active, id }] = queryKey;

    var idString = "";

    if (id != null) {
        idString = `/${id}`;
    }

    const results = await axios.get(url + "/sub_menus" + idString + "?is_active=" + is_active);
    return results;
};
// end of unused ============================================================================================================

const menus = (type, is_active, id) => {
    const menu = require('./Data/menu.json');
    menu?.filter(item => item.type == type && item.is_active == is_active);
    if (id) menu?.filter(item => item.id == id);
    return menu;
};

const sub_menus = (is_active, id) => {
    const subMenu = require('./Data/sub_menu.json');
    subMenu?.filter(item => item.is_active == is_active);
    if (id) subMenu?.filter(item => item.id == id);
    return subMenu;
};

export {valid_apis, receiveEmail, menus, sub_menus};