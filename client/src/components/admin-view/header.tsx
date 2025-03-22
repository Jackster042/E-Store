// ICONS
import { AlignJustify, LogOut } from "lucide-react";

// COMPONENTS
import { Button } from "../ui/button";

// REDUX
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/auth-slice";

const AdminHeader = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* LOGOUT BUTTON */}
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2 shadow rounded-md px-4 py-2 font-medium text-sm"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
