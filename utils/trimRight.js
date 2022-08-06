export const trimRight = function (string = "", charlist) {
  if (charlist === undefined) charlist = "s";

  return string.replace(new RegExp("[" + charlist + "]+$"), "");
};
