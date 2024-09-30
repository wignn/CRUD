import Link from "next/link";
import clsx from 'clsx'
import { useFormStatus, } from "react-dom";
import { useState } from "react";


export const CreateButtonChapter = ({ label }: { label: string }) => {
 
  const { pending } = useFormStatus();
  


  const className = clsx(
    "text-white bg-gradient-to-r from-blue-400 to-purple-600 p-6 rounded-lg shadow-lg hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  )
  return (
    <button type="submit"  className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
  };

  export default CreateButtonChapter