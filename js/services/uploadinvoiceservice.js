uploadInvoiceService = {
    getVendors(data) {
        return response = fetch(data.url + "/getVendors/" + data.session, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },
    getPaymentTypes(data) {
        return response = fetch(data.url + "/GetPaymentTypes/" + data.session + '/' + data.storelocation, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },
    getPaymentSource(data) {
        return response = fetch(data.url + "/GetPaymentSource/" + data.storelocation + '/' + data.PaymentTypeID + '/' + data.session, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },
    saveInvoice(data) {
        return response = fetch(data.url + "/SaveCompleteInvoice", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.data)
        }).then((response) => response)
            .catch((error) => {
                return Promise.reject(error.message || error);
            });
    },
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
module.exports = uploadInvoiceService;