import React from "react";

const Button = ({ className, children }) => {
  return (
    <button
      className={`${className} inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-medium hover:scale-105 active:scale-95 h-10 px-4 py-2`}
    >
      {children}
    </button>
  );
};

export default Button;
