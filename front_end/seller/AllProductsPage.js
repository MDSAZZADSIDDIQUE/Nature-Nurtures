import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useRouter } from "next/router";

const AllProductsPage = () => {
  const router = useRouter();
  const [jsonData, setJSONData] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/seller/getAllProduct",
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

  const deleteProduct = async (productID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/seller/deleteproduct/${productID}`,
        {
          withCredentials: true,
        },
      );
      fetchdata();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SellerSidebar />

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Product ID</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Tags</Table.HeadCell>
          <Table.HeadCell>Availability</Table.HeadCell>
          <Table.HeadCell>Rating</Table.HeadCell>
          <Table.HeadCell>Reviews</Table.HeadCell>
          <Table.HeadCell>Picture</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {jsonData.map((product) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={product.productID}
            >
              <Table.Cell>{product.productID}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.productName}
              </Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.tags}</Table.Cell>
              <Table.Cell>{product.availabilty}</Table.Cell>
              <Table.Cell>{product.ratings}</Table.Cell>
              <Table.Cell>{product.reviews}</Table.Cell>
              <Table.Cell>
                <img
                  src={`http://localhost:3000/seller/getProductPicture/${product.productID}`}
                  width={50}
                  height={50}
                />
              </Table.Cell>
              <Table.Cell>
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  onClick={() =>
                    router.push({
                      pathname: "http://localhost:7000/seller/EditProduct",
                      query: { productID: product.productID },
                    })
                  }
                >
                  <p>Edit</p>
                </button>
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  onClick={() => deleteProduct(product.productID)}
                >
                  <p>Delete</p>
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllProductsPage;
