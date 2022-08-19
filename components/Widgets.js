import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Trending } from "./Trending";
import Image from "next/image";
export const Widgets = ({ trendingResults, followResults }) => {
  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-gray-900 p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-white absolute  inset-0 pl-11 border border-transparent w-full focus:border-blue-500 rounded-full focus:bg-black"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-white  space-y-3 pt-2 rounded-xl w-11/12 xl:w-9/12 bg-gray-900">
        <h4 className="font-bold text-xl px-4">What's happening?</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.3] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-blue-500 font-light">
          Show More
        </button>
      </div>
      <div className="text-white  space-y-3 pt-2 rounded-xl w-11/12 xl:w-9/12 bg-gray-900">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            key={index}
            className="hover:bg-white hover:bg-opacity-[0.3] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <Image
              src={result.userImg}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
        ))}

        <button className="hover:bg-white hover:bg-opacity-[0.3] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-blue-500 font-light">
          Show More
        </button>
      </div>
    </div>
  );
};
