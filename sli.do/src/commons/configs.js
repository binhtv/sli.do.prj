const configs = {
    apiUrl: `${process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'http://localhost'}:1337/api`,
    auth: {
        domain: 'sli.auth0.com',
        clientId: `${process.env.REACT_APP_AUTH_CLIENTID?process.env.REACT_APP_AUTH_CLIENTID: 'SOSoMw3lAZ81V2R5ahBJQq2z_G_rqQEw'}`,
        callbackUrl: `${process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'http://localhost'}:3000/callback`
    }
}
console.log(process.env);
export default configs;