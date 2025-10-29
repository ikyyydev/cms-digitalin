import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { navlinks } from "@/common/constants";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-3xl text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle>
          {/* Logo */}
          <div className="mt-20 mb-10 text-center text-2xl flex justify-center">
            <Link href={"/"}>
              <h1>Logo</h1>
            </Link>
          </div>
          {/* Nav Menu */}
          <nav className="flex flex-col gap-8 justify-center items-center">
            {navlinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="text-xl text-black capitalize font-semibold  hover:text-primary transition-all"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
