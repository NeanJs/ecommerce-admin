import Sidebar from "@/components/sidebar";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./button";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="w-screen h-screen bg-light flex items-center justify-center">
        <button
          onClick={() => signIn("google")}
          className="bg-white py-2 px-4 rounded-lg text-black"
        >
          Login with google
        </button>
      </div>
    );
  }
  return (
    <div className="bg-light min-h-screen text-black flex items-start">
      <Sidebar />
      <div className="flex flex-col bg-white flex-grow my-2 mr-2 rounded-lg p-2 h-screen">
        {children}
      </div>
    </div>
  );
}
