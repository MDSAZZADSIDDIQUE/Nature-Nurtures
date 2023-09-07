"use client";

import SellerSidebar from "@/components/SellerSidebar";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddShopPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("shopName", data.shopName);
    formData.append("shopLocation", data.shopLocation);
    formData.append("shopPicture", data.shopPicture[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/seller/addsellerdetails",
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      router.push("./ShopProfile");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="flex items-start justify-start">
      <SellerSidebar />
      <form
        className="flex w-1/2 max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* First Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop-name" value="Shop Name" />
          </div>
          <TextInput
            id="shop-name"
            type="text"
            {...register("shopName", {
              required: "Shop name is required",
              minLength: {
                value: 3,
                message: "Shop name must be at least 3 characters long",
              },
            })}
            color={errors.shopName ? "failure" : undefined}
            helperText={
              <>{errors.shopName && <span>{errors.shopName.message}</span>}</>
            }
          />
        </div>
        {/* Last Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop-location" value="Shop Location" />
          </div>
          <TextInput
            id="shop-location"
            type="text"
            {...register("shopLocation", {
              required: "Shop Location is required",
              minLength: {
                value: 3,
                message: "Shop Location must be at least 3 characters long",
              },
            })}
            color={errors.shopLocation ? "failure" : undefined}
            helperText={
              <>
                {errors.shopLocation && (
                  <span>{errors.shopLocation.message}</span>
                )}
              </>
            }
          />
        </div>
        {/* Profile Picture */}
        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="shop-picture" value="Upload file" />
          </div>
          <FileInput
            id="shop-picture"
            {...register("shopPicture", {
              required: "File is required",
              validate: {
                fileSize: (value) => {
                  if (value[0]?.size > 1024 * 1024 * 10) {
                    return "File size must be less than 1MB";
                  }
                  return true;
                },
                fileType: (value) => {
                  if (
                    !["image/jpeg", "image/png", "application/pdf"].includes(
                      value[0]?.type,
                    )
                  ) {
                    return "Supported file types are JPEG, PNG, and PDF";
                  }
                  return true;
                },
              },
            })}
          />
          {errors.shopPicture && <p>{errors.shopPicture.message}</p>}
        </div>
        <Button type="submit">Add Shop Information</Button>
      </form>
    </div>
  );
}
