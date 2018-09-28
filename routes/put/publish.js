"use strict";



//  P A C K A G E S

const env = require("vne");
const path = require("path");
const request = require("request-promise-native");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = (responseObject, data) => {
  if (data.authorization !== env.lbry.token) return send(responseObject, 401, "Invalid access token");

  data = data.metadata;
  delete data.authorization;
  delete data.method;

  data.file_path = path.resolve("./" + data.file_path);
  data.name = data.name.replace(/[^\w\s]|[\s]|[_]/g, "-");

  return request({
    body: {
      method: "publish",
      params: data
    },
    json: true,
    url: env.lbry.url
  }, (error, response, body) => {
    if (error) return send(responseObject, 400, { error });
    return send(responseObject, 200, JSON.parse(body));
  });
};
