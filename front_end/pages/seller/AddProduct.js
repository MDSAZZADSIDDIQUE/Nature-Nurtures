import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import AddProductPage from "@/seller/AddProductPage";

const AddProduct = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <AddProductPage />
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default AddProduct;
