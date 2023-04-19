import { activeLink } from "@/constants/custom.styles";

export default function Button({
  title,
  children,
  className,
  onClick,
  icon,
  primary,
}) {
  return (
    <button
      onClick={onClick}
      className={`ease duration-300 flex flex-row items-center px-4 py-2 border-2 border-prime text-center w-fit rounded-full ${
        primary ? "border-prime text-prime hover:bg-prime hover:text-white" : "bg-prime text-white hover:text-prime hover:bg-transparent hover:border-prime"
      }`}
    >
      {title || children}
    </button>
  );
}
