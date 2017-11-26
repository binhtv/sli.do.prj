import auth0 from 'auth0-js';
import fetch from 'isomorphic-fetch';
import configs from '../../commons/configs';
const { auth } = configs;

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: auth.domain,
        clientID: auth.clientId,
        redirectUri: auth.callbackUrl,
        audience: `https://${auth.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);

        //Persit data
        let postData = new FormData();
        postData.append('access_token', authResult.accessToken);
        return fetch(`${configs.apiUrl}/login`, {
            method: 'POST',
            body: postData,
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                    window.location.href = "/";
                }
                throw new Error('The response is not well formed json.');
            }).then(json => {
                console.log(json);
                window.location.href = "/admin/events";
            }).catch(error => {
                console.log(error);
                window.location.href = "/";
            });
    }

    getSession() {
        let session = {};
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        if(new Date().getTime() < expiresAt) {
            session.accessToken = localStorage.getItem('access_token');
            session.idToken = localStorage.getItem('id_token');
            session.expiresAt = localStorage.getItem('expires_at');
        }
        return session;
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}