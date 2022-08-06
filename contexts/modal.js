import { createContext, useContext, useState } from "react";

export const MODALS = {
  NEW_PROJECT: "newProject",
  NEW_TRANSLATION: "newTranslation",
  EDIT_TRANSLATION: "editTranslation",
  EDIT_KEY: "editKey",
};

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(null);

  const _setCurrentModal = (modal) => {
    if (!Object.values(MODALS).includes(modal)) {
      console.error("Invalid modal", modal);
      return;
    }
    setCurrentModal(modal);
  };

  const clearCurrentModal = () => setCurrentModal(null);

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        setCurrentModal: _setCurrentModal,
        clearCurrentModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
