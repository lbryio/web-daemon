"use strict";



//  P A C K A G E S

const baseImage = require("base64-img");
const crypto = require("crypto");
const { send } = require("micro");



//  P R O G R A M

module.exports = exports = async (responseObject, data) => {
  const randomness = crypto.randomBytes(Math.ceil(10 / 2)).toString("hex").slice(0, 10);

  return baseImage.img(data.image, "./uploads", randomness, (imageCreationError, filepath) => {
    if (imageCreationError) return send(responseObject, 500, { imageCreationError });
    return send(responseObject, 200, { filename: filepath, status: "ok" });
  });
};
