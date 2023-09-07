import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import EditProductPage from "@/seller/EditProductPage";

const EditProduct = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <EditProductPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default EditProduct;
