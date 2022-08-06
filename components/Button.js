import classNames from "classnames";

const Button = ({ children, className, ...props }) => {
  const TagName = props.tagName ? props.tagName : props.href ? "a" : "button";

  return (
    <TagName
      className={classNames(
        "bg-emerald-500 flex-auto shadow text-white rounded-md text-sm border-y border-transparent py-2 font-semibold px-3 hover:bg-emerald-600 dark:hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </TagName>
  );
};

export default Button;
