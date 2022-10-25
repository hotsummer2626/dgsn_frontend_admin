import axios from "axios";
import { baseUrl } from "./baseUrl";

export const createProduct = (product) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($product: CreateProductInput) {
          createProduct(product: $product) {
            _id
            name
            brand {
              name
            }
            imgSrc
            price
            expireDate
          }
        }   
      `,
      variables: { product },
    },
  }).then((res) => res.data);

export const getProducts = () =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query {
          products {
            _id
            name
            brand {
              name
            }
            imgSrc
            price
            expireDate
          }
        }
      `,
    },
  }).then((res) => res.data);
