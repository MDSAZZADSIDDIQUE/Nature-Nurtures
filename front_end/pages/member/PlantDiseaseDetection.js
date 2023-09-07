import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import React from "react";
import MemberSidebar from "../../components/MemberSidebar";
import PlantDiseaseDetectionPage from "../../member/PlantDiseaseDetectionPage";

const EditSellerProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <MemberSidebar />
        <PlantDiseaseDetectionPage />
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default EditSellerProfile;
