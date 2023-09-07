import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TextInput } from "flowbite-react";

const EditSellerProfilePage = () => {
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
        "http://localhost:3000/member/showprofiledetails",
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
          "http://localhost:3000/member/editprofiledetails",
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
            First Name:
          </Table.Cell>
          {previousState && property == "firstName" ? (
            <Table.Cell>
              <TextInput
                id="first-name"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "firstName" ? value : jsonData.firstName}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("firstName")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Last Name:
          </Table.Cell>
          {previousState && property == "lastName" ? (
            <Table.Cell>
              <TextInput
                id="last-name"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "lastName" ? value : jsonData.lastName}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("lastName")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Username:
          </Table.Cell>
          {previousState && property == "username" ? (
            <Table.Cell>
              <TextInput
                id="username"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "username" ? value : jsonData.username}
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
            Role:
          </Table.Cell>
          {previousState && property == "role" ? (
            <Table.Cell>
              <TextInput
                id="role"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "role" ? value : jsonData.role}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("role")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Gender:
          </Table.Cell>
          {previousState && property == "gender" ? (
            <Table.Cell>
              <TextInput
                id="gender"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "gender" ? value : jsonData.gender}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("gender")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Date of Birth:
          </Table.Cell>
          {previousState && property == "dateOfBirth" ? (
            <Table.Cell>
              <TextInput
                id="dateOfBirth"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "dateOfBirth"
                ? value
                : jsonData.dateOfBirth}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("dateOfBirth")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Address:
          </Table.Cell>
          {previousState && property == "address" ? (
            <Table.Cell>
              <TextInput
                id="address"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "address" ? value : jsonData.address}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("address")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Telephone Number:
          </Table.Cell>
          {previousState && property == "telephoneNumber" ? (
            <Table.Cell>
              <TextInput
                id="telephoneNumber"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "telephoneNumber"
                ? value
                : jsonData.telephoneNumber}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("telephoneNumber")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Email:
          </Table.Cell>
          {previousState && property == "email" ? (
            <Table.Cell>
              <TextInput
                id="email"
                required
                type="text"
                value={value}
                onChange={getValue}
              />
            </Table.Cell>
          ) : (
            <Table.Cell>
              {value && property == "email" ? value : jsonData.email}
            </Table.Cell>
          )}
          <Table.Cell>
            <button
              onClick={() => editSellerHandler("email")}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default EditSellerProfilePage;
