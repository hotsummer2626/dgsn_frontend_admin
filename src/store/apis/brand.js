import axios from "axios";
import { baseUrl } from "./baseUrl";

export const createBrand = (brand) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($brand: CreateBrandData) {
          createBrand(brand: $brand) {
            _id
            name
            imgSrc
          }
        }      
      `,
      variables: { brand },
    },
  }).then((res) => res.data);

export const getBrands = () =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query {
          brands {
            _id
            name
            imgSrc
          }
        }
      `,
    },
  }).then((res) => res.data);

export const getBrandById = (id) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query ($brandId: ID) {
          brand(id: $brandId) {
            _id
            name
            imgSrc
          }
        }
      `,
      variables: {
        brandId: id,
      },
    },
  }).then((res) => res.data);

export const updateBrand = (newBrand) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($brand: UpdataBrandData) {
          updateBrand(brand: $brand) {
            _id
            name
            imgSrc
          }
        }      
      `,
      variables: {
        brand: newBrand,
      },
    },
  }).then((res) => res.data);
