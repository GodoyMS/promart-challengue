import { Outlet } from "react-router-dom"; // If using React Router for routing
import Header from "./header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-full min-h-screen w-full">
      <Header />
      <div className="flex-1">
        <main className="max-w-7xl mx-auto p-2 md:p-6">
          <Outlet />
          <Toaster
            theme="light"
            richColors={true}
            closeButton={true}
            duration={4000}
          />
        </main>
        
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
