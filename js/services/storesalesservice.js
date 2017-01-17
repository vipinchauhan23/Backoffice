storeSalesService = {
    getDepartmentSalesData(data) {
        return response = fetch(data.url + "/GetDepartmentSalesData/" + data.storeLocationID + '/' + data.endDate + '/'
         + data.ShiftValue + '/' + data.session,
         {
            method: 'get'
        }).then((response) => response.json())
            .catch((error) => {
                //console.error(error);
                return Promise.reject(error.message || error);
            });
    },
     getDayReconDatas(data) {
        return response = fetch(data.url + "/GetDayReconDatas/" + data.storeLocationID + '/' + data.storeName + '/'
         + data.ShiftValue + '/' + data.startDate + '/' + data.endDate + '/' + data.session,
         {
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
module.exports = storeSalesService;
