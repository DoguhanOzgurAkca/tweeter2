import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
// import data from "@emoji-mart/data";
// import { Picker } from "emoji-mart";

export const Input = () => {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [input, setInput] = useState("");
  const filePickRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      userName: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedImage) {
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedImage(null);
    // setShowEmojis(false)
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll ${
        loading && "opacity-50"
      }`}
    >
      <img
        src={session.user.image}
        className="h-10 w-10 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedImage && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent outline-none resize-none text-white text-lg placeholder-gray-500 tracking-wide w-full h-auto"
          />
        </div>
        {selectedImage && (
          <div className="relative">
            <div className="absolute w-8 h-8 bg-black hover:bg-slate-800 bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer">
              <XIcon
                className="text-white h-5"
                onClick={(e) => setSelectedImage(null)}
              />
            </div>
            <img
              src={selectedImage}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            ></img>
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon" onClick={() => filePickRef.current.click()}>
                <PhotographIcon className="h-[1.3rem] text-sky-700" />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickRef}
                ></input>
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="text-sky-700 h-[1.3rem]" />
              </div>
              <div
                className="icon"
                onClick={() => {
                  setShowEmojis(!showEmojis);
                }}
              >
                <EmojiHappyIcon className="text-sky-700 h-[1.3rem]" />
              </div>
              <div className="icon">
                <CalendarIcon className="text-sky-700 h-[1.3rem]" />
              </div>
              {/* {showEmojis && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "29rem",
                  marginLeft: -40,
                  maxWidth: "20rem",
                  borderRadius: "1.25rem",
                }}
                theme="dark"
              />
            )} */}
            </div>
            <button
              className="bg-sky-500 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-sky-800 disabled:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedImage}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
