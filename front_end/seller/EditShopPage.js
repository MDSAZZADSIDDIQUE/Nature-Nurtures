import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TextInput } from "flowbite-react";

const EditShopPage = () => {
  const [jsonData, setJSONData] = useState({});
  const [previousState, setPreviousState] = useState(false);
  const [value, setValue] = useState("");
  const [property, setProperty] = useState("");
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/seller/showprofiledetails",
        {
          withCredentials: true,
        },
      );
      setJSONData(response.data);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const editSellerHandler = async (editProperty) => {
    setProperty(editProperty);
    if (!previousState) {
      setValue(jsonData[property]);
      setPreviousState(true);
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3000/seller/editshop",
          {
            property: property,
            value: value,
          },
          {
            withCredentials: true,
          },
        );
        setJSONData(response.data);
        setValue("");
      } catch (error) {
        console.error(error);
      }
      setPreviousState(false);
    }
  };

  const getValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex min-h-screen">
      <SellerSidebar />
      <Table striped className="w-[80vw]">
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Member ID:
            </Table.Cell>
            <Table.Cell>{jsonData.memberID}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Seller ID:
            </Table.Cell>
            <Table.Cell>{jsonData.sellerID}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Shop Name:
            </Table.Cell>
            {previousState && property == "shopName" ? (
              <Table.Cell>
                <TextInput
                  id="shop-name"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "shopName" ? value : jsonData.shopName}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("shopName")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Shop Location
            </Table.Cell>
            {previousState && property == "shopLocation" ? (
              <Table.Cell>
                <TextInput
                  id="shop-location"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "shopLocation"
                  ? value
                  : jsonData.shopLocation}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("shopLocation")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default EditShopPage;
