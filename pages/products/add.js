import Button from "@/components/button";
import Layout from "@/components/layout";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
export default function NewProduct() {
  let initialValues = {
    name: "",
    description: "",
    price: 0,
    // category: "",
  };
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const TextArea = ({ field, form, ...props }) => (
    <textarea {...field} {...props} />
  );
  if (redirect) {
    router.push("/products");
  }
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <span>Add New Product</span>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await axios.post("/api/products", values);
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
    </Layout>
  );
}
