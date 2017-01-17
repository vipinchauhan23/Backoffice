companystoreService = {
    getstorelocations(data) {
        return response = fetch(data.url + "/GetStoreLocationsByCompanyId/" + data.companyID + '/' + data.sessionID, {
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
module.exports = companystoreService;
