/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let request = require('request');
let PubNub = require('pubnub');
const pubnub = new PubNub({
    publishKey: 'pub-c-7c748e9e-6003-42be-ab7a-b92472d65f44',
    subscribeKey: 'sub-c-30f86508-cee8-11e7-91cc-2ef9da9e0d0e'
});
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
    },

    sendMessage: function (req, res) {
        let message = req.param('message');
        if(!message) {
            message = 'Default message';
        }
        var publishConfig = {
            channel : "ReactChat",
            message : message
        }
        pubnub.publish(publishConfig, (status, response) => {
            sails.log(status);
            sails.log(response);
        });

        return res.json(1);
    }
};

