"use strict";



//  P A C K A G E S

const fs = require("graceful-fs");
const local = require("app-root-path").require;
const { json, send } = require("micro");

//  V A R I A B L E S

const directoryForUploadedFiles = "./uploads";
if (!fs.existsSync(directoryForUploadedFiles)) fs.mkdirSync(directoryForUploadedFiles);

const { getDaemonStatus, resolveContent } = local("/routes/get");
const { publishContent } = local("/routes/put");
const { handleImageUpload, tipCreator } = local("/routes/post");

//  ~     E R R O R
//  H A N D L I N G

process.on("unhandledRejection", (reason, failedPromise) => console.log( // eslint-disable-line
  "▸▸ Unhandled promise rejection\n",
  `▸▸▸▸ ${reason}\n\n`, failedPromise,
  "\n\n◂◂◂◂\n\n"
));

process.on("uncaughtException", error => console.log( // eslint-disable-line
  "▸▸ Unhandled exception\n",
  `▸▸▸▸ ${error}\n\n`,
  "\n\n◂◂◂◂\n\n"
));



//  P R O G R A M

module.exports = exports = async (requestObject, responseObject) => {
  if (requestObject.url === "/favicon.ico") return send(responseObject, 204); // ignore favicon requests
  const data = await json(requestObject);



  switch (requestObject.method) {
    case "GET":
      if (!data.authorization) return send(responseObject, 401, "Unauthorized access detected");
      if (requestObject.url === "/") return getDaemonStatus(responseObject, data);
      if (requestObject.url === "/resolve") return resolveContent(responseObject, data);
      break;



    case "POST":
      if (!data.authorization) return send(responseObject, 401, "Unauthorized access detected");
      if (requestObject.url === "/image") return handleImageUpload(responseObject, data);
      if (requestObject.url === "/wallet_send") return tipCreator(responseObject, data);
      break;



    case "PUT":
      if (!data.authorization) return send(responseObject, 401, "Unauthorized access detected");
      if (requestObject.url === "/publish") return publishContent(responseObject, data);
      break;



    default:
      break;
  }
};
