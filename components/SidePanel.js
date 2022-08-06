import { useEffect, Children } from "react";
import PropTypes from "prop-types";

import { useModal } from "/contexts/modal";
import { useKeyPress } from "/hooks/useKeyPress";
import { childrenOf } from "/utils/childrenOf";

import IconWIndowClose from "/public/images/icons/window-close.svg";

const SidePanel = ({ children, onClose: _onClose }) => {
  const escPress = useKeyPress("Escape");
  const { clearCurrentModal } = useModal();

  const onClose = _onClose || clearCurrentModal;

  useEffect(() => {
    if (escPress) onClose();
  }, [escPress, clearCurrentModal]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()} // Avoid closing the modal when clicking inside
      className="flex flex-col bg-white h-full w-96 max-w-[90%] shadow-xl animate-in fade-in slide-in-from-right-1/4"
    >
      {Children.map(children, (child) => {
        if (
          !["SidePanelHeader", "SidePanelContent", "SidePanelFooter"].includes(
            child.type.name
          )
        )
          return;
        return <child.type {...child.props} onClose={onClose} />;
      })}
    </div>
  );
};

const SidePanelHeader = ({ children, onClose }) => {
  const { clearCurrentModal } = useModal();
  return (
    <header className="flex grow-0 px-3 py-2 justify-between items-center border-b-gray-200 border-b">
      {children && <h3 className="font-semibold">{children}</h3>}
      <button
        className="grow-0 p-1 hover:bg-gray-100 rounded"
        onClick={onClose || clearCurrentModal}
      >
        <IconWIndowClose width="24px" height="24px" />
      </button>
    </header>
  );
};

const SidePanelContent = ({ children }) => {
  return <main className="grow p-2 overflow-y-auto">{children}</main>;
};

const SidePanelFooter = ({ children }) => {
  return <footer className="flex grow-0 p-2 gap-4">{children}</footer>;
};

SidePanel.Header = SidePanelHeader;
SidePanel.Content = SidePanelContent;
SidePanel.Footer = SidePanelFooter;

SidePanel.propTypes = {
  children: PropTypes.arrayOf(
    childrenOf(SidePanelHeader, SidePanelContent, SidePanelFooter)
  ),
};

export default SidePanel;
