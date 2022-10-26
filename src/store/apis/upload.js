import { uploadFile } from "react-s3";

export const uploadImgToS3 = (file, dirName) => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const config = {
    bucketName: "sunny-dgsn",
    dirName,
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };
  return uploadFile(file, config);
};
