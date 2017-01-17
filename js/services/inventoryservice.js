inventoryService = {
    getStockTransTypes(data) {
        return response = fetch(data.url + "/GetStockTransTypes/" + data.session, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },
    getStoreLocationItem(data) {
        return response = fetch(data.url + "/GetStoreLocationItem/" + data.session + '/' + data.posCode + '/' + data.storelocation, {
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

    saveStoreLocationItemStock(data) {
        return response = fetch(data.url + "/SaveStoreLocationItemnStockTrans/" + data.session + '/' + data.storelocation + '/' + data.itemID, {
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

    getMobileItemHistory(data) {
        return response = fetch(data.url + "/GetMobileItemHistory/" + data.storelocationItemID + '/' + data.storelocation +
            '/' + data.startDate + "/" + data.currentDate + "/" + data.itemID + "/" + data.session, {
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
module.exports = inventoryService;
