import { ICONS } from "@/assets/icons";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data } = useSession();
  return (
    <Layout>
      <div className="w-full flex flex-row justify-between">
        <span>Hello, {data?.user?.name}</span>
        <div className="flex flex-col items-center">
          <img src={data.user.image} className="w-8 h-8 rounded-full" />
          <h3 className="flex items-center">
            {data?.user?.name} {ICONS.dropdown}
          </h3>
        </div>
      </div>
    </Layout>
  );
}
