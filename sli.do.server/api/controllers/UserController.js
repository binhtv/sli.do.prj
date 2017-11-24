/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let request = require('request');
module.exports = {
    login: function (req, res) {
        let accessToken = req.param('access_token');
        request({
            url: 'https://sli.auth0.com/userinfo',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }, (err, resp, body) => {
            if (resp.statusCode === 200) {
                let data = JSON.parse(body);
                if (data) {
                    let user = {
                        email: data.email
                    }
                    User.create(user).exec((err, result) => {
                        sails.log(err);
                        sails.log(result);
                    });
                }
            }
        });
        return res.json(1);
    }
};

