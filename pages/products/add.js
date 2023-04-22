import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";
import { toast } from "react-toastify";
export default function NewProduct() {
  return (
    <Layout>
      <span>Add New Product</span>
      <ProductForm />
    </Layout>
  );
}
