import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import EditShopPage from "@/seller/EditShopPage";
import SellerProfilePage from "@/seller/SellerProfilePage";

const SellerProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <EditShopPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default SellerProfile;
