"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { string } from "zod";

export default function Home() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [identificationString, setIdentificationString] =
    useState<string>("Identification");
  const [selectedArray, setSelectedArray] = useState<any[]>([]);

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
      const getToken = await fetch("/api/getSalesOrder", {
        method: "POST",
      });

      if (getToken.ok) {
        const response = await getToken.json();
        setSelectedArray(response.data);
      }
    }
    setIdentificationString("Sales Order");
  }

  async function getSalesReceipts(event: React.FormEvent) {
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
      const getToken = await fetch("/api/getSalesReceipt", {
        method: "POST",
      });

      if (getToken.ok) {
        const response = await getToken.json();
        setSelectedArray(response.data);
      }
    }
    setIdentificationString("Sales Receipt");
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
      const getToken = await fetch("/api/getInvoices", {
        method: "POST",
      });

      if (getToken.ok) {
        const response = await getToken.json();
        console.log(response.data.invoices);
        setSelectedArray(response.data.invoices);
      }
    }
    setIdentificationString("Invoice");
  }

  async function handleDownload(id: number) {
    const formData = new FormData();
    formData.append("id", id.toString());
    const response = await fetch(`/api/downloadInvoice`, {
      method: "POST",
      body: formData,
    });
    console.log("id", id);
  }

  const getValueToDownload = (item: any) => {
    if (identificationString === "Sales Order") {
      return item.salesorder_id;
    } else if (identificationString === "Invoice") {
      return item.invoice_id;
    } else if (identificationString === "Sales Receipt") {
      return item.salesreceipt_id;
    } else {
      return null;
    }
  };

  return (
    <main className="bg-blue-300 w-full min-h-screen h-auto">
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
                id="StartDateInput"
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
                id="EndDateInput"
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
                <tr className="">
                  <th scope="col" className="px-6 py-4">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-4 ">
                    {identificationString} #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedArray.map((item, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">
                      {item.customer_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {identificationString === "Sales Order"
                        ? item.salesorder_number
                        : identificationString === "Invoice"
                        ? item.invoice_number
                        : identificationString === "Sales Receipt"
                        ? item.sales_receipt
                        : null}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{item.date}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="px-3 py-1.5 rounded-sm border-[1px] border-white hover:bg-blue-700 hover:drop-shadow-lg"
                        onClick={() => handleDownload(getValueToDownload(item))}
                      >
                        download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
