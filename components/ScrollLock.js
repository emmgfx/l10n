import { useEffect } from "react";

const ScrollLock = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-end items-center"></div>
  );
};

export default ScrollLock;
