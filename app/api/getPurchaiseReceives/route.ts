import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const getToken = async () => {
    try {
      const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.c82b8f70ed42ec406199b68520df1d7b.2ab82f7b825d1dd5913dae6dcd4ad5da&client_id=1000.2FAGLA9VTGQEWYPAZ9T8TKI3KXYW6E&client_secret=709689cef5c732f00d16f27d4a304e160541c23b13&redirect_uri=http://localhost:3000/&grant_type=refresh_token`;
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

  const getPurchaiseReceives = async () => {
    try {
      const url = `https://www.zohoapis.com/inventory/v1/purchasereceives/?organization_id=837554536`;
      const authToken = access.access_token;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Zoho-oauthtoken ${authToken}`,
        },
      });
      const data = await response.data;

      console.log(data);
      return data;
    } catch (error: any) {
      // Log the detailed error information
      console.log("Error fetching invoices:", error);
      return { error: error.message };
    }
  };

  // Fetch access token
  const access = await getToken();
  const purchaiseReceives = await getPurchaiseReceives();

  return NextResponse.json({ data: purchaiseReceives.purchasereceives });
}
