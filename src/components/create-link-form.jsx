import React from "react";

const CreateLink = () => {
  return (
    <div className="bg-gray-600 transition-all shadow-md shadow-emerald-300 hover:shadow-pink-500 text-white p-4  w-2/5 h-3/5 rounded-md">
      <div className="text-center font-extrabold text-3xl">Login</div>
      <input
        type="text"
        className="w-full my-4 p-2 rounded-md bg-transparent border border-gray-300 text-white"
        placeholder="Enter Url title"
      />
      <input
        type="text"
        className="w-full my-4 p-2 rounded-md bg-transparent border border-gray-300 text-white"
        placeholder="Enter loooong url"
      />
      <div className="w-full my-4 flex gap-2">
        <span className="bg-white px-2 flex items-center justify-center w-fit rounded-md border border-gray-300 text-black font-bold">
          sm-url.in/
        </span>
        <input
          type="text"
          className="flex-auto  p-2 rounded-md bg-transparent border border-gray-300 text-white"
          placeholder="Enter custom url (if needed)"
        />
      </div>
      <button className="w-full bg-white p-2 rounded-md text-black font-bold">
        Login
      </button>
    </div>
  );
};

export default CreateLink;
