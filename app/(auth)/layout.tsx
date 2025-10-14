import Image from "next/image";
import AuthImage from "@/public/img/auth.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 justify-between items-center">
      <div className="w-full h-full relative">
        <Image
          src={AuthImage}
          alt="Auth Image"
          width={800}
          height={800}
          className="w-full h-full object-cover bg-center bg-no-repeat absolute z-0"
        />
        <h2 className="absolute z-10 text-white text-3xl md:text-6xl lg:text-8xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Welcome Back!
        </h2>
        <div className="absolute w-full h-full bg-black opacity-30 z-5"></div>
      </div>
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
}
