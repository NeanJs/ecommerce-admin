import { ICONS } from "@/assets/icons";
import Button from "@/components/button";
import Layout from "@/components/layout";
import Loader from "@/components/loader";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    handleFetchProducts();
  }, []);
  const handleFetchProducts = async () => {
    await axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you really want to delete it?",
      showConfirmButton: true,
    }).then(async () => {
      await axios
        .delete("/api/products?id=" + id)
        .then((res) => {
          toast.success(res.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
      handleFetchProducts();
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 h-full w-full">
        <Link href={"products/add"}>
          <Button primary>Add New Products {ICONS.add}</Button>
        </Link>

        <table className="products table">
          <thead>
            <tr className="">
              <td>Product</td>
              <td>Name</td>
              <td>Description</td>
              <td>Unit Price(USD)</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => (
                <tr className="product" key={product._id}>
                  <td className="w-32 h-32">
                    <img src={product?.images[0]} />
                  </td>
                  <td>{product?.name}</td>
                  <td>{product?.description}</td>
                  <td>{product?.price}</td>
                  <td>
                    <Link
                      className="bg-blue-600 hover:border-blue-600 hover:text-blue-600"
                      href={`products/edit/${product?._id}`}
                    >
                      {ICONS.edit} Edit
                    </Link>
                    <a
                      className="bg-red-600 hover:border-red-600 hover:text-red-600"
                      onClick={() => handleDelete(product?._id)}
                    >
                      {ICONS.delete} Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <span>No Data</span>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
