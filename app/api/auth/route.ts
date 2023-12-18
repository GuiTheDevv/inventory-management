import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const getToken = async (authorizationCode: string) => {
    try {
      const url = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoInventory.FullAccess.all&client_id=1004.7RFUQ9Q9YJW6NO2A186TKNDIHXD79P&response_type=code&redirect_uri=http://www.zoho.com/inventory&access_type=offline`;

      const response = await axios.post(url);
      const data = await response.data;

      console.log(data);
      return data;
    } catch (error: any) {
      // Log the detailed error information
      console.log("Error fetching access token:", error);
      return { error: error.message };
    }
  };

  // Usage
  const authorizationCode =
    "1000.009fe54c9c718d570def774b21c96d4f.526a7acc66fca2fc0a3aa7b5c6dec830";

  // Fetch access token
  const accessToken = await getToken(authorizationCode);
  console.log("Access Token:", accessToken);

  return NextResponse.json({ "Code:": accessToken });
}
