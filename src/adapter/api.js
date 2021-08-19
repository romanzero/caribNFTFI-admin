import config from '../globals/config';

function get_users(name, address) {
    var url = config.backend_url + "get_users";

    const formData = new FormData(); 
    formData.append('name', name);
    formData.append('address', address);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_projects(name) {
    var url = config.backend_url + "get_projects";

    const formData = new FormData(); 
    formData.append('name', name);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function add_project(name, link_prefix, thumbnail) {
    var url = config.backend_url + "add_project";

    const formData = new FormData(); 
    formData.append('name', name);
    formData.append('link_prefix', link_prefix);
    formData.append('thumbnail', thumbnail, thumbnail.name);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function update_project(id, name, link_prefix, thumbnail) {
    var url = config.backend_url + "update_project";

    const formData = new FormData(); 
    formData.append('id', id);
    formData.append('name', name);
    formData.append('link_prefix', link_prefix);
    formData.append('thumbnail', thumbnail, thumbnail.name);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_project(id) {
    var url = config.backend_url + "get_project";

    const formData = new FormData(); 
    formData.append('id', id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function delete_project(id) {
    var url = config.backend_url + "delete_project";

    const formData = new FormData(); 
    formData.append('id', id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_contracts(address, name, project) {
    var url = config.backend_url + "get_contracts";

    const formData = new FormData(); 
    formData.append('address', address);
    formData.append('name', name);
    formData.append('project', project);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function delete_contract(id) {
    var url = config.backend_url + "delete_contract";

    const formData = new FormData(); 
    formData.append('id', id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_contract(id) {
    var url = config.backend_url + "get_contract";

    const formData = new FormData(); 
    formData.append('id', id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_tokens(owner, contract, token_id, project) {
    var url = config.backend_url + "get_all_tokens";

    const formData = new FormData(); 
    formData.append('owner', owner);
    formData.append('contract', contract);
    formData.append('token_id', token_id);
    formData.append('project', project);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function add_contract(address, name, project) {
    var url = config.backend_url + "add_contract";

    const formData = new FormData(); 
    formData.append('address', address);
    formData.append('name', name);
    formData.append('project', project);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function update_contract(address, name, project) {
    var url = config.backend_url + "update_contract";

    const formData = new FormData(); 
    formData.append('address', address);
    formData.append('name', name);
    formData.append('project', project);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_offer_limit(token_id) {
    var url = config.backend_url + "get_offer_limit";

    const formData = new FormData(); 
    formData.append('token_id', token_id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function get_offers(token_id) {
    var url = config.backend_url + "get_offers";

    const formData = new FormData(); 
    formData.append('token_id', token_id);

    return new Promise((resolve, reject) => {
        http_com_form_data(url, formData)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        })
    });
}

function http_com(url, params) {
    const axios = require('axios');

    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            throw error;
        });
    });
}

function http_com_form_data(url, form_data) {
    const axios = require('axios');

    return new Promise((resolve, reject) => {
        axios.post(url, form_data)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            throw error;
        });
    });
}

export default {
    get_users,
    get_projects,
    add_project,
    update_project,
    get_project,
    delete_project,
    get_contracts,
    get_tokens,
    add_contract,
    delete_contract,
    get_contract,
    update_contract,
    get_offer_limit,
    get_offers
}