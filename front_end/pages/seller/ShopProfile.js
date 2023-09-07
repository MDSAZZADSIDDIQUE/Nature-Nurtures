import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import ShopProfilePage from "@/seller/ShopProfilePage";
import React from "react";

const ShopProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <ShopProfilePage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default ShopProfile;
