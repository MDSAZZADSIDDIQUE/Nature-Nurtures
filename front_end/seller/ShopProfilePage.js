import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

const ShopProfilePage = () => {
  const [jsonData, setJSONData] = useState({});
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
      console.log(response.data);
      setJSONData(response.data);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SellerSidebar />
      <img
        src={"http://localhost:3000/seller/showprofilepicture"}
        className="h-[50%] w-[50%]"
      />

      <Table striped className="w-[80w]">
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Seller ID:
            </Table.Cell>
            <Table.Cell>{jsonData.sellerID}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Member ID:
            </Table.Cell>
            <Table.Cell>{jsonData.memberID}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Shop Name
            </Table.Cell>
            <Table.Cell>{jsonData.shopName}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Shop Address:
            </Table.Cell>
            <Table.Cell>{jsonData.shopLocation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ShopProfilePage;
