import React from "react";
import classes from "./loader.module.css";

// const Loader = () => {
//   return (
//     <div className="container">
//       <div className={classes.loader}></div>
//       <div className={classes.loader}></div>
//       <div className={classes.loader}></div>
//     </div>
//   );
// };

const Loader = () => {
  return (
    <div className={classes["section-center"]}>
      <div className={classes["section-path"]}>
        <div className={classes.globe}>
          <div className={classes.wrapper}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
