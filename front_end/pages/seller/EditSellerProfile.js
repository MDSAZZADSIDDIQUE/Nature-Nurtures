import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import EditSellerProfilePage from "@/seller/EditSellerProfilePage";
import React from "react";
import SellerSidebar from "../../components/SellerSidebar";

const EditSellerProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <SellerSidebar />
        <EditSellerProfilePage />
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default EditSellerProfile;
