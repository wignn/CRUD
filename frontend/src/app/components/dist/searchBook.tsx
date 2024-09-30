"use client";

import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";

const Search:React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 border-slate-900 bg-opacity-20 shadow-lg border-2 max-w-72">
      <input
        type="text"
        className="w-full bg-white bg-opacity-20 border-slate-900 py-2 pl-10 text-sm outline-2 rounded-sm"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <IoSearch className="absolute left-3 top-2 h-5 w-5 text-black" />
    </div>
  );
};

export default Search;
