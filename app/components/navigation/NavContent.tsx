import React from "react";
import SignOut from "./SignOut";
import Links from "./Links";

const NavContent = () => {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-between">
      <Links />
      <SignOut />
    </div>
  );
};

export default NavContent;
