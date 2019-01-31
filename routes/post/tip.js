"use strict";



//  P A C K A G E S

const env = require("vne");
const got = require("got");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = async(responseObject, data) => {
  if (data.authorization !== env.lbry.token)
    return send(responseObject, 401, "Invalid access token");

  const options = {
    body: {
      method: data.method,
      params: {
        amount: "0.001", // Hardcoded tip amount for lbry.tech
        claim_id: data.claim_id
      }
    },
    json: true
  };

  try {
    const response = await got(env.lbry.url, options);
    return send(responseObject, 200, response.body); // eslint-disable-line padding-line-between-statements
  } catch(error) {
    return send(responseObject, 400, { error });
  }
};
