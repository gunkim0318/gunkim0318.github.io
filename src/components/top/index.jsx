import React from "react";
import { Link } from "gatsby";
import "./index.scss";

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath;

  if (isRoot) {
    return <></>;
  }
  return (
    <div className="top">
      <Link to={`/`} className="link">
        {title}
      </Link>
    </div>
  );
};
