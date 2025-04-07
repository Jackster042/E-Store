import React, { useEffect } from "react";
import { footerLinks } from "@/config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Facebook,
  Flower,
  Instagram,
  SquareArrowUp,
  Twitter,
  Youtube,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/product-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
interface FooterLink {
  label: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const socialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com",
    icon: <Facebook />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com",
    icon: <Instagram />,
  },
  {
    label: "Twitter",
    url: "https://www.twitter.com",
    icon: <Twitter />,
  },
  {
    label: "Youtube",
    url: "https://www.youtube.com",
    icon: <Youtube />,
  },
];

const footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, productDetails } = useSelector(
    (state: RootState) => state.shopProductStore
  );

  const handleNavigateToListingPage = (
    footerLink: string,
    section: "category" | "brand"
  ) => {
    // For products link, ensure we clear filters and force a new API call
    if (footerLink === "categories" || footerLink === "brands") {
      sessionStorage.removeItem("filters");
      if (location.pathname.includes("listing")) {
        dispatch(
          getFilteredProducts({
            filterParams: {},
            sortParams: "price-lowtohigh",
          })
        );
        setSearchParams(new URLSearchParams());
      } else {
        navigate(`/shop/listing`);
      }
      return;
    }

    sessionStorage.removeItem("filters");
    const filteredItems = {
      [section]: [footerLink],
    };
    console.log(location.pathname, " location.pathname from FOOTER");
    console.log(footerLink, " footerLink from FOOTER");
    console.log(filteredItems, " filteredItems from FOOTER");
    sessionStorage.setItem("filters", JSON.stringify(filteredItems));
    navigate(`/shop/listing`);
  };

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, []);

  useEffect(() => {
    console.log(products, " products from FOOTER");
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-gray-100">
      <Separator className="w-full" />

      <div className="flex justify-between w-full max-w-7xl mx-auto px-4 mt-10">
        <Link
          to="/shop/home"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Flower className="h-8 w-8" />
          <span className="font-bold text-3xl">Elora</span>
        </Link>

        <div className="hidden md:flex lg:flex xl:flex items-center gap-10">
          {socialLinks.map((link) => (
            <Link to={link.url} key={link.label}>
              {link.icon}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden md:block lg:block xl:block">
            Back to top
          </span>
          <SquareArrowUp
            className="h-8 w-8 cursor-pointer ml-4 hover:bg-gray-200 rounded-lg p-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
      </div>

      {/* <Separator className="w-full my-4" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-28 mt-10 mb-4">
        {footerLinks?.map((footerLink) => (
          <div key={footerLink.title}>
            <h2 className="text-lg font-bold">{footerLink.title}</h2>
            <ul className="list-none">
              {footerLink.links.map((link) => (
                <li key={link.label} className="py-1 hover:underline">
                  {footerLink.title === "Categories" ? (
                    <span
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() =>
                        handleNavigateToListingPage(
                          link.label.toLowerCase(),
                          "category"
                        )
                      }
                    >
                      {link.label}
                    </span>
                  ) : footerLink.title === "Brands" ? (
                    <span
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() =>
                        handleNavigateToListingPage(
                          link.label.toLowerCase(),
                          "brand"
                        )
                      }
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link to={link.url}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex md:hidden lg:hidden xl:hidden gap-10 mt-10">
          {socialLinks.map((link) => (
            <Link to={link.url} key={link.label}>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      <Separator className="w-full my-4" />

      <p className="text-sm text-gray-500 pb-4">
        &copy; {new Date().getFullYear()} Elora. All rights reserved.
      </p>
    </div>
  );
};

export default footer;
