import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./button";

export default function ProductForm({ product }) {
  let [initialValues, setInitialValues] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
  });

  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const TextArea = ({ field, form, ...props }) => (
    <textarea {...field} {...props} />
  );
  if (redirect) {
    router.push("/products");
  }

  return (
    <div className="flex flex-col w-full">
      {/* <span> {!product ? "Add New Product" : "Edit Product"}</span> */}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (product?._id) {
            const { _id } = product;
            await axios.put("/api/products", { ...values, _id });
          } else {
            await axios.post("/api/products", values);
          }
          setRedirect(true);
        }}
      >
        <Form className="form-fields flex flex-col gap-4">
          <Field name="name" type="text" placeholder="Product Name" />

          <Field
            name="description"
            type="text"
            placeholder="Description"
            component={TextArea}
          />

          <Field name="price" type="number" placeholder="Price" />
          <Button title={`Submit`} primary />
        </Form>
      </Formik>
    </div>
  );
}
