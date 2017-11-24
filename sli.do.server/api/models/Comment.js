/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'comments',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    event_id: 'string',
    commentator: 'string',
    content: 'string',
    like_count: 'integer',
    highlight: 'integer',
    deleted: 'integer'
  }
};

