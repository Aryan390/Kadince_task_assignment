import React from "react";

export const Card = ({ className, children }) => {
  return (
    <div
      className={`${className} rounded-lg border bg-card text-card-foreground shadow-sm`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return <div className={`${className} p-6 pt-0`}>{children}</div>;
};
