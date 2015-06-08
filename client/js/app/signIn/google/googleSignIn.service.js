var gapi = require('google-api');

/*@ngInject*/
module.exports = function ($http, $q, credentials, googleAppId) {
    var _authClient, _onAuthorized;

    return {
        authorize: authorize
    };

    function authorize(onAuthorized) {
        _onAuthorized = onAuthorized;
        onOAuth2(function (authClient) {
            authClient.grantOfflineAccess({
                redirect_uri: 'postmessage'
            }).then(signIn);
        });
    }

    function onOAuth2(callback) {
        if (_authClient) {
            callback(_authClient);
        } else {
            gapi.load('auth2', function () {
                _authClient = gapi.auth2.init({
                    client_id: googleAppId,
                    immediate: false
                });
                callback(_authClient);
            });
        }
    }

    function signIn(authResult) {
        return verifyCode(authResult.code)
            .success(function (result) {
                credentials.set(result);
                _onAuthorized();
            })
            .error(function (reason) {
                console.log(reason);
                //todo
            });
    }

    function verifyCode(code) {
        return $http.post('/api/auth/google', {
            code: code
        });
    }
};