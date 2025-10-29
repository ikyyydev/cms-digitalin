import { navlinks } from "@/common/constants";
import Link from "next/link";

const Navlink = () => {
  return (
    <ul className="flex gap-5">
      {navlinks.map((link, index) => {
        return (
          <li
            key={index}
            className="hover:text-blue-500 transition-all ease-in duration-100"
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navlink;
