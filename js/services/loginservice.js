loginService = {
    userLogin(data) {
        return response = fetch(data.url + "/checkauthentication/" + data.username, {
            method: 'post',
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'text/json',
                'Content-length': data.password.length,
            },
            body: JSON.stringify(data.password)
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
module.exports = loginService;

