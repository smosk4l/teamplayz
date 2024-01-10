import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Button from '../Button';
import notFoundImage from '../../../assets/404-image.jpg';
import { FormHeading, FormSubHeading, Input } from '../Form';

const NotFoundError = () => {
  return (
    <>
      <Navbar />
      <div className="my-6 flex flex-col items-center">
        <div className="w-full max-w-[500px]">
          <FormHeading title="404 - Page not found" />
          <FormSubHeading
            title="
          The page you are looking for might have been removed had its name changed or is temporarily unavailable."
          />
          <div className="my-2 w-full px-12">
            <img
              src={notFoundImage}
              alt="Error 404 ilustration"
              className="sm:max-w-[500px] sm:max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundError;

// <div className="w-screen mx-auto max-w-[500px]">
//   <div className="w-full h-full flex flex-col items-center justify-center gap-3  font-rubik text-center px-4 md:justify-start">
//     <img
//       src={notFoundImage}
//       alt="Error 404 ilustration"
//       className="sm:max-w-[500px] sm:max-h-[500px]"
//     />
//     <p className="text-lg uppercase font-medium">404 - Page not found</p>
//     <p className="text-sm">
//       The page you are looking for might have been removed had its name
//       changed or is temporarily unvailable.
//     </p>
//     <Button text={'Go to homepage'} />
//   </div>
// </div>
