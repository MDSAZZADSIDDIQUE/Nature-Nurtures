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
    console.log(data);
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("availabilty", data.availabilty);
    formData.append("productPicture", data.productPicture[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/seller/addProduct",
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
      router.push("./AllProducts");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="flex items-start justify-start">
      <SellerSidebar />
      <form
        className="ml-20 flex w-[500px] max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Product Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="product-name" value="Product Name" />
          </div>
          <TextInput
            id="product-name"
            type="text"
            {...register("productName", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Product name must be at least 3 characters long",
              },
            })}
            color={errors.productName ? "failure" : undefined}
            helperText={
              <>
                {errors.productName && (
                  <span>{errors.productName.message}</span>
                )}
              </>
            }
          />
        </div>
        {/* Product Price */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            type="number"
            {...register("price", {
              required: "Product price is required",
            })}
            color={errors.price ? "failure" : undefined}
            helperText={
              <>{errors.price && <span>{errors.price.message}</span>}</>
            }
          />
        </div>
        {/* Product Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <TextInput
            id="description"
            type="text"
            {...register("description", {
              required: "Product description is required",
            })}
            color={errors.description ? "failure" : undefined}
            helperText={
              <>
                {errors.description && (
                  <span>{errors.description.message}</span>
                )}
              </>
            }
          />
        </div>
        {/* Product Category */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <TextInput
            id="category"
            type="text"
            {...register("category", {
              required: "Product category is required",
            })}
            color={errors.category ? "failure" : undefined}
            helperText={
              <>{errors.category && <span>{errors.category.message}</span>}</>
            }
          />
        </div>
        {/* Product tags */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="tags" value="Tags" />
          </div>
          <TextInput
            id="tags"
            type="text"
            {...register("tags", {
              required: "Product tags is required",
            })}
            color={errors.tags ? "failure" : undefined}
            helperText={
              <>{errors.tags && <span>{errors.tags.message}</span>}</>
            }
          />
        </div>
        {/* Product availability */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="availability" value="Availability" />
          </div>
          <TextInput
            id="availability"
            type="text"
            {...register("availability", {
              required: "Product availability is required",
            })}
            color={errors.availability ? "failure" : undefined}
            helperText={
              <>
                {errors.availability && (
                  <span>{errors.availability.message}</span>
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
            {...register("productPicture", {
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
          {errors.productPicture && <p>{errors.productPicture.message}</p>}
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
}
