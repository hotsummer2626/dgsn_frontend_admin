import axios from "axios";
import { baseUrl } from "./baseUrl";

export const getUsers = () =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query {
          users {
            _id
            username
          }
        }
      `,
    },
  }).then((res) => res.data);

export const getUserById = (id) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        query($userId: ID) {
          user(id: $userId) {
            username
          }
        }
      `,
      variables: {
        userId: id,
      },
    },
  }).then((res) => res.data);
