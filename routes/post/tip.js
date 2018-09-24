"use strict";



//  P A C K A G E S

const env = require("vne");
const request = require("request-promise-native");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = (responseObject, data) => {
  if (data.authorization !== env.lbry.token) return send(responseObject, 401, "Invalid access token");

  return request({
    body: {
      method: data.method,
      params: {
        amount: "0.01",
        claim_id: data.claim_id
      }
    },
    json: true,
    url: env.lbry.url
  }, (error, response, body) => {
    if (error) return send(responseObject, 400, { error });
    return send(responseObject, 200, JSON.parse(body));
  });
};
