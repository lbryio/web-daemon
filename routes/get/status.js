"use strict";



//  P A C K A G E S

const axios = require("axios");
const env = require("vne");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = (responseObject, data) => {
  if (data.authorization !== env.lbry.token) return send(responseObject, 401, "Invalid access token");

  return axios.get(env.lbry.url)
    .then(response => {
      return send(responseObject, 200, { status: response.status, statusText: response.statusText });
    })
    .catch(error => {
      return send(responseObject, 400, { error });
    });
};
