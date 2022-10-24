import React, { useEffect, useState } from "react";

import { SparklesIcon } from "@heroicons/react/outline";
import { Input } from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-xl flex items-center sm:justify-between py-2 px-3 sticky z-50 bg-black border-b border-gray-700">
        <p className="font-bold">Home</p>
        <div className="h-7 w-7 hoverAnimation flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
