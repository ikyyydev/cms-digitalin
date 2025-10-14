import Link from "next/link";
import React from "react";
import Navlink from "./Navlink";
import MobileNav from "./MobileNav";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 min-h-[50px] py-4 border-b border-gray-300">
      <div className="container-fluid flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <h1>Logo</h1>
        </Link>

        {/* Dekstop Nav */}
        <div className="hidden md:flex">
          <Navlink />
        </div>

        {/* Button */}
        <div className="hidden md:flex md:gap-4">
          <UserButton />
          <Button>Login</Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
