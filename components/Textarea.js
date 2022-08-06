import { forwardRef } from "react";
import classNames from "classnames";

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={classNames(
        "mt-1",
        "mb-1",
        "block",
        "w-full",
        "rounded",
        "border-gray-300",
        "bg-white",
        "text-gray-700",
        "shadow-sm",
        "focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50",
        props.error && "focus:border-red-300 focus:ring focus:ring-red-200",
        className
      )}
    />
  );
});

export default Textarea;
