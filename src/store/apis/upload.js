import { uploadFile } from "react-s3";

export const uploadImgToS3 = (file, dirName) => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const config = {
    bucketName: "sunny-dgsn",
    dirName,
    region: "us-east-1",
    accessKeyId: "AKIA25EBUAKEUDJWTLPX",
    secretAccessKey: "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",
  };
  return uploadFile(file, config);
};
