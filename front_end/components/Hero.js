import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_llth3j5e.json";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("./registration/Registration");
  };
  return (
    <div className="z-0">
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-white">
          <Lottie animationData={animationData} />
        </div>
        <h1 className="hero-overlay z-10 ml-20 mt-96 bg-opacity-0 text-4xl font-bold text-accent">
          <p>Discover, learn, and contribute</p>
          to a greener world.
          <button
            className="btn btn-accent btn-outline mt-10 block"
            onClick={redirect}
          >
            Get Started
          </button>
        </h1>
      </div>
      <div className="hero min-h-screen shadow-lg">
        <div className="hero-content flex-col lg:flex-row">
          <img src="./6859464.jpg" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="mx-10 text-5xl font-bold">Why Plant Trees?</h1>
            <h1 className="mx-10 mt-10 text-2xl">
              Discover the Importance of Trees
            </h1>
            <p className="mx-10 py-6">
              Trees are not only a source of natural beauty but also play a
              crucial role in maintaining the ecological balance of our planet.
              Learn about the benefits of trees, including their role in oxygen
              production, carbon sequestration, and providing habitat for
              diverse wildlife.
            </p>
            <button className="btn btn-primary mx-10">Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen shadow-lg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="./6432897.jpg" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="mx-10 text-5xl font-bold">Explore Our Blog</h1>
            <h1 className="mx-10 mt-10 text-2xl">Dive into Tree Wisdom</h1>
            <p className="mx-10 py-6 ">
              Delve into our collection of informative and captivating blogs
              about trees, ranging from their fascinating life cycles to tips on
              tree care and landscaping. Whether you're a tree enthusiast or a
              gardening novice, our blog has something for everyone.
            </p>
            <button className="btn btn-primary mx-10">Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen shadow-lg">
        <div className="hero-content flex-col lg:flex-row">
          <img src="./6409776.jpg" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="mx-10 text-5xl font-bold">Shop Our Trees</h1>
            <h1 className="mx-10 mt-10 text-2xl">Bringing Nature Home</h1>
            <p className="mx-10 py-6">
              Transform your surroundings by browsing through our curated
              selection of trees available for purchase. From ornamental
              flowering trees to sturdy shade providers, our diverse range
              ensures there's a perfect match for every outdoor space.
            </p>
            <button className="btn btn-primary mx-10">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
