import React from "react";
import { footerLinks } from "@/config";
import { Link } from "react-router-dom";
import { Facebook, Flower, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "../ui/separator";

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
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-gray-100">
      <Separator className="w-full" />

      <div className="flex justify-between w-full max-w-7xl mx-auto px-4 mt-10">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Flower className="h-8 w-8" />
          <span className="font-bold text-3xl">Elora</span>
        </Link>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link to={link.url} key={link.label}>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* <Separator className="w-full my-4" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-28 mt-10 mb-4">
        {footerLinks?.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <ul className="list-none">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="w-full my-4" />

      <p className="text-sm text-gray-500 pb-4">
        &copy; {new Date().getFullYear()} Elora. All rights reserved.
      </p>
    </div>
  );
};

export default footer;
