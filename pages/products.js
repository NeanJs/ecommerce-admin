import { ICONS } from "@/assets/icons";
import Button from "@/components/button";
import Layout from "@/components/layout";
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
  }, [products]);
  return (
    <Layout>
      <div className="flex flex-col">
        <Link href={"products/add"}>
          <Button primary>Add New Products {ICONS.add}</Button>
        </Link>
        <div className="products flex flex-row gap-4">
          {products?.map((product) => (
            <div
              className="flex flex-col justify-between gap-2 w-[200px] min-h-[200px] ease duration-300 cursor-pointer p-2 rounded-md shadow-md hover:shadow-lg"
              key={product._id}
            >
              <div className="flex flex-col items-start gap-2">
                <span>
                  Name: <strong>{product?.name}</strong>
                </span>
                <p className="text-sm text-ellipsis">
                  {product?.description}
                </p>
              </div>
              <span>
                Price: <strong>USD {product?.price}</strong>
              </span>
              <Button title={`Add to cart`} className="rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
