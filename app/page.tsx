"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // const getToken = async (authorizationCode: string) => {
  //   try {
  //     const response = await axios.post("ZOHOOauthTokenURL", {
  //       client_id: process.env.ZOHO_CLIENT_ID,
  //       client_secret: process.env.ZOHO_CLIENT_SECRET,
  //       redirect_uri: "http://localhost:3000/",
  //       code: authorizationCode,
  //       grant_type: "authorization_code",
  //     });

  //     return response.data.access_token;
  //   } catch (error) {
  //     console.error("Error fetching access token:", error);
  //     return null;
  //   }
  // };

  // Usage
  // const authorizationCode =
  //   "1000.bcc286bdd78690c179461bac875d39c2.f06c4f9924e55f8b1651ad61171b13c9";

  // // Fetch access token
  // const accessToken = await getToken(authorizationCode);
  // console.log("Access Token:", accessToken);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [salesOrders, setSalesOrders] = useState<string[]>();
  const [salesReceipt, setSalesReceipt] = useState<string[]>();
  const [invoices, setInvoices] = useState<string[]>();

  async function getSalesOrder(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    // Check if any required fields are empty
    if (startDate === "" || endDate === "") {
      alert("Please verify dates chosen");
      return;
    } else {
      // Send the data in a POST request
      const getToken = await fetch("/api/auth", {
        method: "POST",
      });

      if (getToken.ok) {
        console.log("good");
      }
    }
  }

  async function getSalesReceipts(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    console.log(startDate + " " + endDate);

    // Check if any required fields are empty
    if (startDate === "" || endDate === "") {
      alert("Please verify dates chosen");
      return;
    } else {
      // Send the data in a POST request
      const sendEmail = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (sendEmail.ok) {
        location.reload();
      } else {
        return;
      }
    }
  }

  async function getInoices(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    // Check if any required fields are empty
    if (startDate === "" || endDate === "") {
      alert("Please verify dates chosen");
      return;
    } else {
      // Send the data in a POST request
      const sendEmail = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (sendEmail.ok) {
        location.reload();
      } else {
        return;
      }
    }
  }

  return (
    <main className="bg-blue-300 w-full h-screen">
      <div className="w-full flex justify-center">
        <div className="w-3/4 my-12 bg-blue-900 rounded-md px-12 pb-20 drop-shadow-lg">
          <div className="flex items-center gap-5 justify-center text-black py-7">
            <div className="flex flex-col items-center my-5">
              <label htmlFor="StartDateInput" className="mb-1 text-white">
                Start Date
              </label>
              <input
                className="rounded-md px-3 py-2 hover:cursor-text drop-shadow-xl"
                type="date"
                name="StartDateInput"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <span className="text-white font-semibold mt-6 first-letter:my-5 drop-shadow-xl">
              -
            </span>
            <div className="flex flex-col items-center">
              <label htmlFor="EndDateInput" className="mb-1  text-white">
                End Date
              </label>
              <input
                className="rounded-md px-3 py-2 hover:cursor-text drop-shadow-xl"
                type="date"
                name="EndDateInput"
                value={endDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-3 text-white pb-20">
            <button
              className="bg-blue-500 px-4 hover:drop-shadow-lg py-1.5 rounded-md hover:scale-110 duration-200 ease-in-out"
              onClick={getSalesOrder}
            >
              Sales Order
            </button>
            <button
              className="bg-blue-500 px-4 hover:drop-shadow-lg py-1.5 rounded-md hover:scale-110 duration-200 ease-in-out"
              onClick={getSalesReceipts}
            >
              Sales Receipt
            </button>
            <button
              className="bg-blue-500 px-4 hover:drop-shadow-lg py-1.5 rounded-md hover:scale-110 duration-200 ease-in-out"
              onClick={getInoices}
            >
              Invoices
            </button>
          </div>
          <div className="flex flex-col w-full justify-center items-center text-white">
            <p className="text-3xl font-semibold tracking-wide border-b-2 mb-12 border-white">
              VIEW ITEMS FOR DOWNLOAD
            </p>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    First
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                  <td className="whitespace-nowrap px-6 py-4">Larry</td>
                  <td className="whitespace-nowrap px-6 py-4">Wild</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="px-3 py-1.5 rounded-sm border-[1px] border-white hover:bg-blue-700 hover:drop-shadow-lg">
                      download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
