import { ICONS } from "@/assets/icons";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Button from "./button";

export default function ProductForm({ product }) {
  let [initialValues, setInitialValues] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    images: product?.images || [],
  });
  const [images, setImages] = useState(product?.images || []);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const TextArea = ({ field, form, ...props }) => (
    <textarea {...field} {...props} />
  );
  if (redirect) {
    router.push("/products");
  }
  useEffect(() => {
    console.log(initialValues.images);
  }, [initialValues]);
  const handleImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const formdata = new FormData();
      for (let file of files) {
        formdata.append("file", file);
      }
      setIsUploading(true);
      const { data } = await axios.post("/api/upload", formdata);

      setIsUploading(false);
      setImages((existing) => {
        return [...existing, ...data.links];
      });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (product?._id) {
            const { _id } = product;

            await axios
              .put("/api/products", { ...values, _id, images: images })
              .then((res) => {
                setImages([]);
                return toast.success("Product updated successfully!");
              })
              .catch((err) => {
                toast.error(err.data.message);
              });
          } else {
            await axios
              .post("/api/products", { ...values, images: images })
              .then((res) => {
                setImages([]);

                toast.success("Product added successfully");
              })
              .catch((err) => {
                toast.error(err.data.message);
              });
          }
          setRedirect(true);
        }}
      >
        <Form className="form-fields flex flex-col gap-4">
          <div className="flex flex-col">
            <label>Name of Product</label>
            <Field
              name="name"
              type="text"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Product Image</label>
            <input type="file" name="images" multiple onChange={handleImages} />
            <span>{isUploading && "Uploading"}</span>
            <div className="flex flex-row items-center gap-4 mt-2">
              {product?.images?.length
                ? product?.images?.map((image) => (
                    <Link href={image} target="_blank">
                      <img key={image} className="w-20 h-20" src={image} />
                    </Link>
                  ))
                : images?.map((image) => (
                    <Link href={image} target="_blank">
                      <img key={image} className="w-20 h-20" src={image} />
                    </Link>
                  ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label>Product Description</label>
            <Field
              required
              name="description"
              type="text"
              placeholder="Description"
              component={TextArea}
            />
          </div>
          <div className="flex flex-col">
            <label>Unit Price(USD)</label>
            <Field name="price" type="number" placeholder="Price" required />
          </div>
          <Button title={`Submit`} primary />
        </Form>
      </Formik>
    </div>
  );
}
