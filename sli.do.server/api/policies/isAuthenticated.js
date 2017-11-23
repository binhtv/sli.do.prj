/**
 * isAuthenticated
 *
 */
var jwt = require('express-jwt');

var authCheck = jwt({
  secret: new Buffer('eqKH0LD7L4C_kONrIn1xvmiD3n-E17vkExLVmSEYbiR3vuPxtEYHGKlGhIdd733y', 'base64'),
  audience: 'SOSoMw3lAZ81V2R5ahBJQq2z_G_rqQEw'
});

module.exports = authCheck;