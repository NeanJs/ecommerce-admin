import { ICONS } from "@/assets/icons";
import { activeLink } from "@/constants/custom.styles";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const LINKS = [
    {
      title: "Dashboard",
      icon: ICONS.home,
      path: "/dashboard",
    },
    {
    title: "Products",
      icon: ICONS.products,
      path: "/products",
    },
    {
      title: "Orders",
      icon: ICONS.orders,
      path: "/orders",
    },
    {
      title: "Settings",
      icon: ICONS.settings,
      path: "/settings",
    },
  ];

  const { pathname } = useRouter();
  return (
    <aside className="sidebar p-4">
      <Link href={"dashboard"} className="flex items-center gap-2 mb-4 px-2">
        {ICONS.store}
        <span>Ecommerce Admin</span>
      </Link>
      <nav className="flex flex-col items-stretch gap-2">
        {LINKS.map((link, _id) => (
          <Link
            className={`link flex flex-row gap-2 items-center px-2 py-4 hover:gap-4 hover:bg-prime hover:text-white ease duration-300 rounded-md ${
              pathname.includes(link?.path) ? activeLink : ""
            }`}
            href={link?.path}
            key={`${link?.title}-${_id}`}
          >
            <span className={"w-6"}>{link?.icon}</span>
            <span>{link?.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
