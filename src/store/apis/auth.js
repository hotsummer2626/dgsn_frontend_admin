import axios from "axios";
import { baseUrl } from "./baseUrl";

export const login = ({ username, password }) =>
  axios({
    method: "POST",
    url: `${baseUrl}/graphql`,
    data: {
      query: `
        mutation ($user: Input) {
          login(user: $user) {
            _id
            username
            token
          }
        }
      `,
      variables: {
        user: { username, password },
      },
    },
  }).then((res) => res.data);
