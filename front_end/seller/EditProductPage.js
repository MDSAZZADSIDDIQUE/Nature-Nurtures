import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TextInput } from "flowbite-react";
import { useRouter } from "next/router";

const EditProductPage = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query.productID);

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
        `http://localhost:3000/seller/getProduct/${query.productID}`,
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
          "http://localhost:3000/seller/updateproduct",
          {
            productID: jsonData.productID,
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
              Product ID:
            </Table.Cell>
            <Table.Cell>{jsonData.productID}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Product Name
            </Table.Cell>
            {previousState && property == "productName" ? (
              <Table.Cell>
                <TextInput
                  id="product-name"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "productName"
                  ? value
                  : jsonData.productName}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("productName")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Price:
            </Table.Cell>
            {previousState && property == "price" ? (
              <Table.Cell>
                <TextInput
                  id="price"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "price" ? value : jsonData.price}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("price")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Description:
            </Table.Cell>
            {previousState && property == "description" ? (
              <Table.Cell>
                <TextInput
                  id="description"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "description"
                  ? value
                  : jsonData.description}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("username")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Category:
            </Table.Cell>
            {previousState && property == "category" ? (
              <Table.Cell>
                <TextInput
                  id="category"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "category" ? value : jsonData.category}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("category")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Tags:
            </Table.Cell>
            {previousState && property == "tags" ? (
              <Table.Cell>
                <TextInput
                  id="tags"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "tags" ? value : jsonData.tags}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("tags")}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Availabilty
            </Table.Cell>
            {previousState && property == "availabilty" ? (
              <Table.Cell>
                <TextInput
                  id="availabilty"
                  required
                  type="text"
                  value={value}
                  onChange={getValue}
                />
              </Table.Cell>
            ) : (
              <Table.Cell>
                {value && property == "availabilty"
                  ? value
                  : jsonData.availabilty}
              </Table.Cell>
            )}
            <Table.Cell>
              <button
                onClick={() => editSellerHandler("availabilty")}
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

export default EditProductPage;
