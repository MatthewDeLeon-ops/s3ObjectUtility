import {S3Client,GetObjectCommand} from "@aws-sdk/client-s3";

import configuration from "../utils/configuration.json";
import https from "node:https";
import s3Params from "../utils/getObjectParams.json";

import fs from "fs";

const client = new S3Client({
  credentials: {
    accessKeyId: configuration.accessKeyId,
    secretAccessKey: configuration.secretAccessKey,
  },
  region: configuration.region,
});

// const bucketWithPrefix = `${bucket}/${prefix}`;
const Key: string = s3Params.Key;
let s3Bucket: string = s3Params.Bucket;
const objectRetrieval = async (s3Bucket: any, Key: any) => {
  let shouldContinue: any;
  while (shouldContinue === true) {
    let s3Input: GetObjectCommand = new GetObjectCommand({
      Bucket: s3Bucket,
      Key: Key,
    });
    // let awsResponse = await client.send(s3Input);
    // console.log('storageClass',awsResponse.StorageClass,'ETag',awsResponse.ETag,'ContentType',awsResponse.ContentType);;
    // console.log('data', data);
  }
  const s3File = fs.createWriteStream(`../downloads/${Key}`);
  // NOT Perfect but will work meantime.
  const request = https.get(
    `https://${s3Bucket}.s3.amazonaws.com/${Key}`,
    function (response) {
      response.pipe(s3File);
      // after download completed close s3Filestream
      s3File.on("finish", () => {
        s3File.close();
        console.log(`${Key} ~ Download Completed`);
      });
    }
  );
};
objectRetrieval(s3Bucket, Key);
