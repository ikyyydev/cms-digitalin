import { socialsfooter } from "@/common/constants";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Footer = () => {
  return (
    <footer className="py-6 bg-slate-900 text-white w-full">
      <div className="container-fluid flex flex-col gap-6 items-center">
        <div className="flex justify-between w-full">
          <Link href={"/"}>
            <h1>Logo</h1>
          </Link>
          <div className="flex gap-4 items-center">
            {socialsfooter.map((item, index) => {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger
                    asChild
                    className="cursor-pointer p-1.5 md:p-3 bg-white rounded-full text-black hover:opacity-80"
                  >
                    <Link href={item.href} target="_blank">
                      {item.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="w-full py-2 border-t-[1px] border-gray-300">
          <p className="text-center text-sm md:text-lg text-slate-500 font-medium">
            Copyright &copy; 2025 <span>Rifki Jaya Afandi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
