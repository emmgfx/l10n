// https://stackoverflow.com/a/39457422/1378408

import PropTypes from "prop-types";

export function childrenOf(...types) {
  let fieldType = PropTypes.shape({
    type: PropTypes.oneOf(types),
  });

  return PropTypes.oneOfType([fieldType, PropTypes.arrayOf(fieldType)]);
}
