import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import AllProductsPage from "@/seller/AllProductsPage";
import React from "react";

const AddShop = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <AllProductsPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default AddShop;
