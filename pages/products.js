import { ICONS } from "@/assets/icons";
import Button from "@/components/button";
import Layout from "@/components/layout";
import Loader from "@/components/loader";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <div className="flex flex-col gap-4 h-full w-full">
        <Link href={"products/add"}>
          <Button primary>Add New Products {ICONS.add}</Button>
        </Link>
        {products.length ? (
          <table className="products table">
            <thead>
              <tr className="">
                <td>Name</td>
                <td>Description</td>
                <td>Unit Price(USD)</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product?.name}</td>
                  <td>{product?.description}</td>
                  <td>{product?.price}</td>
                  <td className="flex gap-2 flex-row flex-wrap">
                    <Link
                      className="bg-blue-600 hover:border-blue-600 hover:text-blue-600"
                      href={`products/edit/${product?._id}`}
                    >
                      {ICONS.edit} Edit
                    </Link>
                    <Link
                      className="bg-red-600 hover:border-red-600 hover:text-red-600"
                      href={`products/${product?._id}`}
                    >
                      {ICONS.delete} Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  );
}
