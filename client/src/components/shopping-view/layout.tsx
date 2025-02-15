import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      {/* COMMON HEADER */}
      <ShoppingHeader />
      <main className="flex w-full flex-col ">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
