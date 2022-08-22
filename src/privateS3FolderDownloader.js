import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import configuration from "../utils/configuration.json" assert { type: "json" };
import https from "node:https";
import getObjectParams from "../utils/getObjectParams.json" assert { type: "json" };
import fs from "fs";

const client = new S3Client({
  credentials: {
    accessKeyId: configuration.accessKeyId,
    secretAccessKey: configuration.secretAccessKey,
  },
  region: configuration.region,
});

const Key = getObjectParams.Key;

const getObjectUrl = async (configuration) => {
  const client = new S3Client(configuration);
  const objectRetrieval = new GetObjectCommand(getObjectParams);
  console.log("help", objectRetrieval);
  let objectURL = await getSignedUrl(client, objectRetrieval, {
    expiresIn: 300,
  });
  console.log(objectURL);
  https.get(objectURL, (response) => {
    const path = `../downloads/${Key}`;
    const filePath = fs.createWriteStream(path);
    response.pipe(filePath);
    filePath.on("finish", () => {
      filePath.close();
      console.log(`${Key}: Download Completed`);
    });
  });

};
getObjectUrl(configuration);
// */