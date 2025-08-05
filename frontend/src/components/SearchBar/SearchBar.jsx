import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, onClearSearch }) => {
  return (
    <div className="flex items-center px-4 text-white bg-transparent rounded-md mt-5 w-[98%] mx-auto">
      <FaMagnifyingGlass className="text-slate-400" />
      <input
        type="text"
        placeholder="Search Tasks"
        className="w-full text-xs text-muted-foreground bg-transparent py-[11px] px-[10px] outline-none focus:gradient-primary/50"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
