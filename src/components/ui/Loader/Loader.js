import { useEffect } from "react";

import LoaderSVG from "./puff.svg";

const Loader = (props) => {
  useEffect(() => {
    document.getElementById("root").style.height = "100%";
    return () => {
      document.getElementById("root").style.height = "initial";
    };
  }, []);
  return (
    <div className="h-full w-full bg-indigo-700 flex flex-col justify-center items-center">
      <div>
        <img src={LoaderSVG} alt="Loadint" width={200} />
      </div>
      {props.children && (
        <div className="text-white mt-4">{props.children}</div>
      )}
    </div>
  );
};

export default Loader;
