import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

export const Trending = ({ result }) => {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.3] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className=" text-gray-500 text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-gray-500 text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}{" "}
        </p>
      </div>
      {result.img ? (
        <Image
          src={result.img}
          width={70}
          height={70}
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <DotsCircleHorizontalIcon className="h-5 text-gray-600 group-hover:text-blue-500 " />
        </div>
      )}
    </div>
  );
};
