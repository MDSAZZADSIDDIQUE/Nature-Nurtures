import React from "react";
import { Sidebar } from "flowbite-react";
import { FaUserAlt } from "react-icons/fa";

const SellerSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example w-[20vw]">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="http://localhost:7000/seller/SellerDashboard">
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Collapse label="Profile">
            <Sidebar.Item href="http://localhost:7000/seller/SellerProfile">
              Your Profile
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/seller/EditSellerProfile">
              Edit Profile
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Seller Profile">
            <Sidebar.Item href="http://localhost:7000/seller/AddShop">
              Add Seller Information
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/seller/ShopProfile">
              Your Seller Profile
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/seller/EditShop">
              Edit Seller Profile
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Product Management">
            <Sidebar.Item href="http://localhost:7000/seller/AddProduct">
              Add Product
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/seller/AllProducts">
              All Product
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href=" http://localhost:7000/login/Login">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SellerSidebar;
