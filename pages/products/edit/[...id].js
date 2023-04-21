import Layout from "@/components/layout";
import Loader from "@/components/loader";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/products?id=" + id).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id]);

  return (
    <Layout>
      <span>Edit Product</span>
      {product ? <ProductForm product={product} /> : <Loader />}
    </Layout>
  );
}
