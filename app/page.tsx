"use client";
import { useState } from "react";

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

  async function handleDownload(id: number) {
    const formData = new FormData();
    formData.append("id", id.toString());

    if (identificationString == "Sales Order") {
      const response = await fetch(`/api/downloadSaleOrder`, {
        method: "POST",
        body: formData,
      });
    } else if (identificationString == "Invoice") {
      const response = await fetch(`/api/downloadInvoice`, {
        method: "POST",
        body: formData,
      });
    }
  }

  const getValueToDownload = (item: any) => {
    if (identificationString === "Sales Order") {
      return item.salesorder_id;
    } else if (identificationString === "Invoices") {
      return item.invoice_id;
    } else if (identificationString === "Sales Receipt") {
      return item.salesreceipt_id;
    } else {
      return null;
    }
  };

  const handleOptionChange = async (e: any) => {
    setSelectedArray([]);
    if (e.target.value == "Transfer Orders") {
      const response = await fetch(`/api/getTransferOrders`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    } else if (e.target.value == "Sales Order") {
      const formData = new FormData();
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      const response = await fetch(`/api/getSalesOrder`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    } else if (e.target.value == "Shipment Orders") {
      const response = await fetch(`/api/getShipmentOrders`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    } else if (e.target.value == "Invoices") {
      const response = await fetch(`/api/getInvoices`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    } else if (e.target.value == "Purchaise Orders") {
      const response = await fetch(`/api/getPurchaiseOrders`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    } else if (e.target.value == "Purchaise Receives") {
      const response = await fetch(`/api/getPurchaiseReceives`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedArray(result.data);
      }
    }
    setIdentificationString(e.target.value.toString());
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
                  setEndDate(e.target.value);
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
                  e.preventDefault();
                  setEndDate(e.target.value);
                  if (startDate >= e.target.value) {
                    setStartDate(e.target.value);
                    console.log(startDate + " ... " + endDate);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center pb-16">
            <div className="relative inline-block text-left">
              <div>
                <span className="rounded-md shadow-sm">
                  <select
                    onChange={handleOptionChange}
                    className="block text-black cursor-pointer appearance-none w-full border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="cursor-pointer"
                    >
                      Select ...
                    </option>
                    <option value="Transfer Orders" className="cursor-pointer">
                      Transfer Orders
                    </option>
                    <option value="Sales Order" className="cursor-pointer">
                      Sales Order
                    </option>
                    <option value="Shipment Orders" className="cursor-pointer">
                      Shipmeant Orders
                    </option>
                    <option value="Invoices" className="cursor-pointer">
                      Invoices
                    </option>
                    <option value="Purchaise Orders" className="cursor-pointer">
                      Purchaise Orders
                    </option>
                    <option
                      value="Purchaise Receives"
                      className="cursor-pointer"
                    >
                      Purchaise Receives
                    </option>
                  </select>
                </span>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 fill-current text-gray-700"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 12.586z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center text-white">
            <p className="text-3xl font-semibold tracking-wide border-b-2 mb-12 border-white">
              VIEW ITEMS FOR DOWNLOAD
            </p>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="">
                  <th scope="col" className="px-6 py-4">
                    {identificationString === "Purchaise Receives" ||
                    identificationString === "Purchaise Orders"
                      ? "Vendor Name"
                      : identificationString === "Transfer Orders"
                      ? "Created by"
                      : "Customer Name"}
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
                      {identificationString === "Sales Order"
                        ? item.customer_name
                        : identificationString === "Invoices"
                        ? item.customer_name
                        : identificationString === "Purchaise Receives"
                        ? item.vendor_name
                        : identificationString === "Purchaise Orders"
                        ? item.vendor_name
                        : identificationString === "Shipment Orders"
                        ? item.vendor_name
                        : identificationString === "Transfer Orders"
                        ? item.created_by_name
                        : null}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {identificationString === "Sales Order"
                        ? item.salesorder_number
                        : identificationString === "Invoices"
                        ? item.invoice_number
                        : identificationString === "Purchaise Receives"
                        ? item.purchasereceive_number
                        : identificationString === "Purchaise Orders"
                        ? item.purchaseorder_number
                        : identificationString === "Shipment Orders"
                        ? item.shipment_number
                        : identificationString === "Transfer Orders"
                        ? item.transfer_order_number
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
