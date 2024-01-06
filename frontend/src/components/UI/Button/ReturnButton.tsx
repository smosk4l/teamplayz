import React from 'react';
import { TbArrowBackUp } from 'react-icons/tb';

const ReturnButton = ({ navigate }: { navigate: () => void }) => (
  <button
    onClick={navigate}
    className={'w-full rounded-lg border border-green-600 px-6 py-1'}
  >
    <div className="flex items-center justify-center gap-2 text-green-600 ">
      <TbArrowBackUp className="text-xl" />
      <span>Return</span>
    </div>
  </button>
);

export default ReturnButton;
