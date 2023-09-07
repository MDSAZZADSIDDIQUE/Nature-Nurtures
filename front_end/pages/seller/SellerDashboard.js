import MultiLevelDropdown from "@/seller/AddProductPage";
import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import React from "react";
import SellerSidebar from "../../components/SellerSidebar";
import Lottie from "lottie-react";
import animationData from "../../public/animation_lltvz3q8.json";

const SellerDashboard = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <SellerSidebar />
        <div className="flex">
          <Lottie animationData={animationData} className="w-[60vw]" />
          <div>
            <h1 className="mt-10 text-4xl font-bold">Hello, Md. Sazzad</h1>
            <h1 className="mt-10 text-2xl font-bold">Let's start the day.</h1>
          </div>
        </div>
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default SellerDashboard;
