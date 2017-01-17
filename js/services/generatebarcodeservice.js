generatebarcodeService = {
    getStoreLocationItem(data) {
        return response = fetch(data.url + "/GetStoreLocationItemDescription/" + data.session + '/' + data.barcodeNo + '/' + data.storelocation, {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                //console.error(error);
                return Promise.reject(error.message || error);
            });
    },
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
module.exports = generatebarcodeService;