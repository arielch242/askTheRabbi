import React from "react";

const Footer = () => {
  return (
    <p className="border-top border-dark pt-3 text-center text-white">
      A.C. Web.Dev &copy; {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
