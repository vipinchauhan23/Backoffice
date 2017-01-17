Environment = {
    getUrl() {
        
        const env = 'prod';
        
        if (env == 'prod') {
            return "https://sync.advbackoffice.com:8443/RestFulMobileService/RestFulService/AdvMobileRestWMDataService.svc";
        }
        else if (env == 'demo') {
            return "http://96.87.14.86:91/RestFulService/AdvMobileRestWMDataService.svc";
        }
        else {
            return "http://192.168.1.161:8090/RestFulService/AdvMobileRestWMDataService.svc";
        }
    },
}
module.exports = Environment;