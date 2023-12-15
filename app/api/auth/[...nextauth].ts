import axios from "axios";

const getToken = async (authorizationCode: string) => {
  try {
    const response = await axios.post("ZOHOOauthTokenURL", {
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/",
      code: authorizationCode,
      grant_type: "authorization_code",
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Usage
const authorizationCode =
  "1000.bcc286bdd78690c179461bac875d39c2.f06c4f9924e55f8b1651ad61171b13c9";

// Fetch access token
const accessToken = await getToken(authorizationCode);
console.log("Access Token:", accessToken);
