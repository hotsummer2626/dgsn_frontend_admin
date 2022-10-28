import { uploadFile } from "react-s3";
import axios from "axios";

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

export const uploadImgToCloudinary = (file, dirName) => {
  const formData = new FormData();
  const uploadPresetList = {
    brands: process.env.REACT_APP_UPLOAD_PRESET_BRANDS,
    products: process.env.REACT_APP_UPLOAD_PRESET_PRODUCTS,
  };
  formData.append("file", file);
  formData.append("upload_preset", uploadPresetList[dirName]);
  return axios({
    method: "POST",
    url: process.env.REACT_APP_UPLOAD_URL,
    data: formData,
  }).then((res) => res.data);
};
