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

export const getProductById = (id) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query ($productId: ID) {
          product(id: $productId) {
            _id
            brand {
              _id
              name
            }
            imgSrc
            name
            price
            expireDate
          }
        }
      `,
      variables: {
        productId: id,
      },
    },
  }).then((res) => res.data);

export const updateProduct = (newProduct) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($product: UpdateProductInput) {
          updateProduct(product: $product) {
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
      variables: {
        product: newProduct,
      },
    },
  }).then((res) => res.data);

export const deleteProduct = (id) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($deleteProductId: ID) {
          deleteProduct(id: $deleteProductId)
        }
      `,
      variables: {
        deleteProductId: id,
      },
    },
  }).then((res) => res.data);
