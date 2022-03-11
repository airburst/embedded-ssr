import base64 from "base-64"

export interface AuthProps {
  error?: string;
  access_token?: string;
  expires_in?: string;
};

export const auth = async () => {
  const URL = `${process.env.COGNITO_URL}/oauth2/token`;
  const xsrfToken = process.env.XSRF_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const authorization = `Basic ${base64.encode(clientId + ":" + clientSecret)}`;

  const payload = {
    grant_type: "client_credentials",
    scope: "https://com.simplybusiness.api/default",
    cookie: `XSRF-TOKEN=${xsrfToken}`
  };

  const formData: string = Object.entries(payload)
  .reduce((acc: string[], cur) => [
    `${encodeURIComponent(cur[0])}=${encodeURIComponent(cur[1])}`,
    ...acc
  ], []).join("&");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization,
    },
    body: formData
  }

  const res = await fetch(URL, options);
  const data = await res.json();

  return  data;
}