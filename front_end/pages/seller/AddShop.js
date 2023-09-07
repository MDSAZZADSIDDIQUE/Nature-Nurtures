import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import AddShopPage from "@/seller/AddShopPage";
import React from "react";

const AddShop = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <AddShopPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default AddShop;
