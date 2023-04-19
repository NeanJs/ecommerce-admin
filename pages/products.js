import { ICONS } from "@/assets/icons";
import Button from "@/components/button";
import Layout from "@/components/layout";
import Link from "next/link";
export default function Products() {
  return (
    <Layout>
      <div className="flex flex-col">
        <Link href={"products/add"}>
          <Button primary>Add New Products {ICONS.add}</Button>
        </Link>
      </div>
    </Layout>
  );
}
