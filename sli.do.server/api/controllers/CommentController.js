/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let PubNub = require('pubnub');
const pubnub = new PubNub({
    publishKey: 'pub-c-7c748e9e-6003-42be-ab7a-b92472d65f44',
    subscribeKey: 'sub-c-30f86508-cee8-11e7-91cc-2ef9da9e0d0e'
});
module.exports = {
    newComment: function (req, res) {
        let eid = req.param('eid');
        if (!eid) {
            return res.json({
                code: 0,
                message: 'Not found'
            });
        }
        try {
            let criteria = {
                id: eid,
                deleted: 0
            }
            Event.findOne(criteria).exec((err, event) => {
                let commentator = req.param('commentator');
                let content = req.param('comment');
                if (err) {
                    return res.serverError(err);
                }
                let comment = {
                    event_id: event.id,
                    commentator: commentator?commentator:'Anonymous',
                    content: content,
                    like_count: 0,
                    highlight: 0
                }
                Comment.create(comment).exec((err, result) => {
                    if(err) {
                        return res.serverError(e);
                    }
                    result.new = 1;
                    //Send notificaiton
                    var publishConfig = {
                        channel : event.code,
                        message : JSON.stringify(result)
                    }
                    pubnub.publish(publishConfig, (status, response) => {
                        sails.log(status);
                        sails.log(response);
                    });
            
                    return res.json({
                        code: 1,
                        data: result
                    });
                });
            });
        } catch (e) {
            return res.serverError(e);
        }
    },
};

