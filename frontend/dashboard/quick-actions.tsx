import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const AddMember = () => {
  return (
    <div>
      <button className=" ">
        <Link
          href={"/members"}
          className="bg-[#252525] text-white flex items-center justify-center rounded-sm text-[.85rem] capitalize py-2 px-4"
        >
          <PlusIcon size={16} /> member
        </Link>
      </button>
    </div>
  );
};
export const AddEvent = () => {
  return (
    <div>
      <button className=" ">
        <Link
          href={"/members"}
          className="bg-[#252525] text-white flex items-center justify-center rounded-sm text-[.85rem] capitalize py-2 px-4"
        >
          <PlusIcon size={16} /> Event
        </Link>
      </button>
    </div>
  );
};
export const CheckIn = () => {
  return (
    <div>
      <button className=" ">
        <Link
          href={"/members"}
          className="bg-[#252525] text-white flex items-center justify-center rounded-sm text-[.85rem] capitalize py-2 px-4"
        >
          <PlusIcon size={16} /> Check In
        </Link>
      </button>
    </div>
  );
};
