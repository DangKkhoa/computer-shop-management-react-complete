import React from 'react'
import { ImageUp } from 'lucide-react';

const UploadImage = ({title, handleImageChange}) => {
  return (
    <label htmlFor="image" className="cursor-pointer text-sky-500 flex">
      <ImageUp />
      <span className="text-md font-semibold">{title}</span>
      <input
        type="file"
        id="image"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  );
}

export default UploadImage