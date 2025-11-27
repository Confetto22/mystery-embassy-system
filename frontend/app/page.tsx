import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminSignIn() {
  const inputs = [
    {
      icon: <Mail size={26} />,
      placeholder: "your email",
      type: "email",
    },
    {
      icon: <LockKeyhole size={26} />,
      placeholder: "password",
      type: "password",
    },
  ];
  return (
    <section className="grid lg:grid-cols-2 h-screen">
      <div className="bg-(--main-blue) hidden lg:flex px-8 py-12 text-center  flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/dv9aqxptd/image/upload/v1745458633/homchapel/IMG-20250415-WA0017-removebg-preview_dg6k6e.webp"
          alt="mystery embassy"
          className="max-w-[300px]"
        />
        <h2 className="text-white font-bold text-[2rem]">
          Welcome to Mystery Embassy
        </h2>
        <p className="text-gray-300 font-light mt-5 text-[1.3rem]">
          Manage your church with ease - track attendance, finances and growth,
          all from one powerful dashboard.
        </p>
      </div>
      <div className="flex flex-col gap-7 items-center justify-center px-8 py-14">
        <div className="text-center  w-full max-w-[80%]">
          <h2 className="font-bold text-[var(--main-blue)] text-[1.8rem]">
            SIGN IN
          </h2>
          <p className="text-gray-500">
            Welcome back! Please sign in to your account
          </p>
        </div>
        <form className="w-full gap-6 max-w-[80%]  flex flex-col items-center justify-center">
          {inputs.map((singleInput) => (
            <div
              className="flex border w-full border-gray-300 rounded-l-sm rounded-r-sm "
              key={singleInput.placeholder}
            >
              <label className="border-r border-gray-300 w-[15%] lg:w-[12%] lg:px-3 px-2 flex items-center justify-center  rounded-l-sm ">
                {singleInput.icon}
              </label>
              <input
                type={singleInput.type}
                placeholder={singleInput.placeholder}
                className="col-span-6  rounded-r-sm w-full px-5 py-2 outline-1 focus:outline-[var(--main-blue)] ease-in duration-300 focus:border-0"
              />
            </div>
          ))}
        </form>
        <Link href={"#"} className="text-blue-400 w-full max-w-[80%] text-right">
          Forgot Password?
        </Link>
        <button className="text-[1.2rem] font-semibold max-w-[80%] py-2 rounded-sm px-5 uppercase text-white bg-[var(--main-blue)] w-full">
          sign in
        </button>
      </div>
    </section>
  );
}
