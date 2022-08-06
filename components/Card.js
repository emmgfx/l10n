import { Children } from "react";

import IconClose from "../public/images/icons/window-close.svg";

const Card = ({ children, onClose }) => {
  return (
    <section className="border border-gray-200 bg-gray-50 rounded-lg shadow-sm">
      {Children.map(children, (child) => {
        if (!["CardHeader", "CardBody"].includes(child.type.name)) return;
        return <child.type {...child.props} onClose={onClose} />;
      })}
    </section>
  );
};

const CardHeader = ({ children, onClose }) => {
  return (
    <header className="flex justify-between border-b border-gray-200 py-3 px-4">
      <span>{children}</span>
      {onClose && (
        <button onClick={onClose}>
          <IconClose width="24px" height="24px" />
        </button>
      )}
    </header>
  );
};

const CardBody = ({ children }) => {
  return <main className="py-3 px-4">{children}</main>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
