import { useEffect } from "react";

import { useModal } from "../contexts/modal";
import { useKeyPress } from "../hooks/useKeyPress";

const Modal = ({ children }) => {
  const escPress = useKeyPress("Escape");
  const { clearCurrentModal } = useModal();

  useEffect(() => {
    if (escPress) clearCurrentModal();
  }, [escPress, clearCurrentModal]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center animate-in fade-in">
      {children}
    </div>
  );
};

export default Modal;
