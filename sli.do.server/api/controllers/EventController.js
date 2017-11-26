/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let request = require('request');
module.exports = {
    createEvent: function (req, res) {
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
                    User.findOne({
                        email: data.email
                    }).exec(function (err, user) {
                        if (err) {
                            sails.log(err);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }
                        if (!user) {
                            return res.json({
                                code: 0,
                                message: 'User not found'
                            });
                        }
                        try {
                            let postData = JSON.parse(req.param('data'));
                            let event = {
                                name: postData.name,
                                date_from: postData.date_from ? postData.date_from : (new Date()).toISOString(),
                                date_to: postData.date_to ? postData.date_to : (new Date()).toISOString(),
                                user_id: user.id,
                                code: 'EVENT' + new Date().getTime(),
                                deleted: 0
                            }
                            Event.create(event).exec((err, result) => {
                                if (err) {
                                    sails.log(err);
                                    return res.json({
                                        code: 0,
                                        message: 'Internal server error'
                                    });
                                }

                                return res.json({
                                    code: 1,
                                    data: result
                                });
                            });
                        } catch (e) {
                            sails.log(e);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }

                    });
                }
            } else {
                return res.json({
                    code: 0,
                    message: 'Internal server error'
                });
            }
        });
    },

    getEvents: function (req, res) {
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
                    User.findOne({
                        email: data.email
                    }).exec(function (err, user) {
                        if (err) {
                            sails.log(err);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }
                        if (!user) {
                            return res.json({
                                code: 0
                            });
                        }
                        try {
                            let criteria = {
                                user_id: user.id,
                                deleted: 0
                            }
                            let eQuery = Event.find(criteria)
                            eQuery.sort('id desc');
                            eQuery.exec((err, result) => {
                                if (err) {
                                    sails.log(err);
                                    return res.json({
                                        code: 0,
                                        message: 'Internal server error'
                                    });
                                }

                                return res.json({
                                    code: 1,
                                    data: result
                                });
                            });
                        } catch (e) {
                            sails.log(e);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }

                    });
                }
            } else {
                return res.json({
                    code: 0,
                    message: 'Internal server error'
                });
            }
        });
    },

    getEventByCode: function(req, res) {
        try {
            let ecode = req.param('ecode');
            if(!ecode) {
                return res.json({
                    code: 0,
                    message: 'Not found'
                });
            }
            let criteria = {
                code: ecode,
                deleted: 0
            }
            Event.find(criteria).exec((err, events) => {
                if (err) {
                    sails.log(err);
                    return res.json({
                        code: 0,
                        message: 'Internal server error'
                    });
                }
                
                return res.json({
                    code: 1,
                    data: events
                });
            });
        } catch (e) {
            sails.log(e);
            return res.json({
                code: 0,
                message: 'Internal server error'
            });
        }
    },

    getEventAudience: function (req, res) {
        try {
            let eid = req.param('eid');
            if(!eid) {
                return res.json({
                    code: 0,
                    message: 'Not found'
                });
            }
            let criteria = {
                id: eid,
                deleted: 0
            }
            Event.findOne(criteria).exec((err, event) => {
                if (err) {
                    sails.log(err);
                    return res.json({
                        code: 0,
                        message: 'Internal server error'
                    });
                }
                if(!event) {
                    if(!event) {
                        return res.json({
                            code: 1,
                            data: {
                                eventInfo: {},
                                comments:[]
                            }
                        });
                    }
                }
                let commentCriteria = {
                    event_id: event.id,
                    deleted: 0
                }
                let commentQuery = Comment.find(commentCriteria);
                commentQuery.sort('like_count desc').sort('createdAt asc');
                commentQuery.exec((err, comments) => {
                    return res.json({
                        code: 1,
                        data: {
                            eventInfo: event,
                            comments: comments
                        }
                    });
                });
            });
        } catch (e) {
            sails.log(e);
            return res.json({
                code: 0,
                message: 'Internal server error'
            });
        }
    },
    getEvent: function (req, res) {
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
                    User.findOne({
                        email: data.email
                    }).exec(function (err, user) {
                        if (err) {
                            sails.log(err);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }
                        if (!user) {
                            return res.json({
                                code: 0,
                                message: 'User Not found'
                            });
                        }
                        try {
                            let eid = req.param('eid');
                            if (!eid) {
                                return res.json({
                                    code: 0,
                                    message: 'Not found'
                                });
                            }
                            let criteria = {
                                user_id: user.id,
                                id: eid,
                                deleted: 0
                            }
                            Event.findOne(criteria).exec((err, event) => {
                                if (err) {
                                    sails.log(err);
                                    return res.json({
                                        code: 0,
                                        message: 'Internal server error'
                                    });
                                }
                                if(!event) {
                                    return res.json({
                                        code: 1,
                                        data: {
                                            eventInfo: {},
                                            comments:[]
                                        }
                                    });
                                }
                                let commentCriteria = {
                                    event_id: event.id,
                                    deleted: 0
                                }
                                let commentQuery = Comment.find(commentCriteria);
                                commentQuery.sort('like_count desc').sort('createdAt asc');
                                commentQuery.exec((err, comments) => {
                                    return res.json({
                                        code: 1,
                                        data: {
                                            eventInfo: event,
                                            comments: comments
                                        }
                                    });
                                });
                            });
                        } catch (e) {
                            sails.log(e);
                            return res.json({
                                code: 0,
                                message: 'Internal server error'
                            });
                        }

                    });
                }
            } else {
                return res.json({
                    code: 0,
                    message: 'Internal server error'
                });
            }
        });
    },
};

