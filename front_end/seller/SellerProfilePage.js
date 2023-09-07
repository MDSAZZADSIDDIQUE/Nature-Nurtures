import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

const SellerProfilePage = () => {
  const [jsonData, setJSONData] = useState({});
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

  return (
    <Table striped className="w-[100vw]">
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
          <Table.Cell>{jsonData.firstName}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Last Name:
          </Table.Cell>
          <Table.Cell>{jsonData.lastName}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Username:
          </Table.Cell>
          <Table.Cell>{jsonData.username}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Role:
          </Table.Cell>
          <Table.Cell>{jsonData.role}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Gender:
          </Table.Cell>
          <Table.Cell>{jsonData.gender}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Date of Birth:
          </Table.Cell>
          <Table.Cell>{jsonData.dateOfBirth}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Address:
          </Table.Cell>
          <Table.Cell>{jsonData.address}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Telephone Number:
          </Table.Cell>
          <Table.Cell>{jsonData.telephoneNumber}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Email:
          </Table.Cell>
          <Table.Cell>{jsonData.email}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default SellerProfilePage;
