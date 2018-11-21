"use strict";



//  N A T I V E

const path = require("path");

//  P A C K A G E S

const env = require("vne");
const got = require("got");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = async(responseObject, data) => {
  if (data.authorization !== env.lbry.token) return send(responseObject, 401, "Invalid access token");

  data = data.metadata;
  delete data.authorization;
  delete data.method;

  data.bid = "0.001"; // Hardcoded publish amount for lbry.tech
  data.file_path = path.resolve("./" + data.file_path);
  data.name = data.name.replace(/[^\w\s]|[\s]|[_]/g, "-");

  const options = {
    body: {
      method: "publish",
      params: data
    },
    json: true
  };

  try {
    const response = await got(env.lbry.url, options);

    response.body.result.lbrytech_claim_name = data.name;
    return send(responseObject, 200, response.body);
  } catch (error) {
    return send(responseObject, 400, { error });
  }
};
