'use-strict';
quickItemService = {
    getDepartments(data) {
        return response = fetch(data.url + "/GetStoreDepartments/" + data.storelocation + "/" + data.session, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    getStoreLocationItem(data) {
        return response = fetch(data.url + "/GetStoreLocationItems/" + data.session + '/' + data.posCode + '/' + data.storelocation, {
            method: 'get',
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'text/json'
            }
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    checkPOSCode(data) {
        return response = fetch(data.url + "/CheckPOSCode/" + data.session + '/' + data.posCode + '/' + data.storelocation, {
            method: 'get',
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'text/json'
            }
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    getMobileItemHistory(data) {
        return response = fetch(data.url + "/GetMobileItemHistory/" + data.storelocationItemID + '/' + data.storelocation +
            '/' + data.startDate + "/" + data.endDate + "/" + data.itemID + "/" + data.session, {
                method: 'get',
                headers: {
                    'Accept': 'text/json',
                    'Content-Type': 'text/json'
                }
            }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    saveStoreItem(data) {
        return response = fetch(data.url + "/SaveItem/" + data.session, {
            method: 'post',
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'text/json'
            },
            body: JSON.stringify(data.data)
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    getItemStockTransactionByCurrentDate(data) {
        return response = fetch(data.url + "/GetItemStockTransactionByCurrentDate/" + data.posCode + '/' + data.storelocation, {
            method: 'get',
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'text/json'
            }
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },

    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
module.exports = quickItemService;
//fetch('http://192.168.1.124:1337/questionSets/'+data.userid