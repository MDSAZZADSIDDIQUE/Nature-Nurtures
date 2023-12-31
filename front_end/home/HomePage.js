import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithCTAButton from "@/layouts/NavbarWithCTAButton";
import { Flowbite } from "flowbite-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_ll9r3svp.json";
import Hero from "../components/Hero";
import ChatBox from "../components/ChatBox";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Flowbite>
      <title>Nature Nurtures</title>
      <NavbarWithCTAButton />
      <button
        class="chat-button fixed bottom-10 right-10 z-10"
        onClick={toggleChatbox}
      >
        {!isOpen && <Lottie animationData={animationData} className="w-52" />}
      </button>
      <button
        class="chat-button fixed bottom-10 right-20 z-10"
        onClick={toggleChatbox}
      >
        {isOpen && (
          <Lottie animationData={animationData} className="mr-[350px] w-52" />
        )}
      </button>
      {isOpen && <ChatBox />}
      <Hero />
      <FooterWithSocialMediaIcons />
    </Flowbite>
  );
};

export default HomePage;
