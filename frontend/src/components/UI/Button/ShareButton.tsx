import React from 'react';
import { MdOutlineIosShare } from 'react-icons/md';

const ShareButton = () => (
  <button className={'w-full rounded-lg border border-green-600 px-6 py-1'}>
    <div className="flex items-center justify-center gap-2 text-green-600">
      <MdOutlineIosShare className="text-xl" />
      <span>Share</span>
    </div>
  </button>
);

export default ShareButton;
