// React
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Icons
import { HousePlug, LogOut, Menu, ShoppingCart, User } from "lucide-react";

// UI
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logoutUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";

// Add interface for cart response
interface CartResponse {
  items: Array<{
    productId: {
      _id: string;
      image: string;
      title: string;
      price: number;
    };
    quantity: number;
    _id: string;
  }>;
}

// Config
import { shoppingViewHeaderMenuItems } from "@/config";
import { useState } from "react";
import UserCartWrapper from "./cart-wrapper";
import { getCart } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// TODO: BUG WHEN CLICK ON MENU ITEMS ONE AFTER ANOTHER THE FILTER DOESN'T APPLY
const MenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (getCurrentMenuItem: any) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          // to={menuItem.path}
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <span>{menuItem.label}</span>
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state: RootState) => state.authStore);
  const { items } = useSelector((state: RootState) => state.shoppingCartStore);

  // Cast items to CartResponse
  const cartData = items as unknown as CartResponse;

  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getCart(user?._id));
  }, [dispatch]);

  console.log(items, "items from header");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* CART BUTTON */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">user cart</span>
        </Button>
        <UserCartWrapper
          items={
            cartData && cartData.items && cartData.items.length > 0
              ? cartData.items
              : []
          }
        />
      </Sheet>
      {/* USER DROPDOWN MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        {/* USER DROPDOWN MENU CONTENT */}
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className="h-4 w-4 mr-2" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authStore
  );

  // Log the user object directly
  console.log(`Result of isAuthenticated: ${isAuthenticated}`);
  console.log(user); // Log the user object directly

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* LEFT SIDE - LOGO */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">E Store</span>
        </Link>

        {/* SHEET */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs flex flex-col justify-between "
          >
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>

          {/* MENU ITEMS */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>
        </Sheet>

        {/* AUTHENTICATED USER */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
