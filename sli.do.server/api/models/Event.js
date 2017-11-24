/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'events',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    code: 'string',
    user_id: 'integer',
    name: 'string',
    date_from: 'datetime',
    date_to: 'datetime',
    deleted: 'integer'
  }
};

