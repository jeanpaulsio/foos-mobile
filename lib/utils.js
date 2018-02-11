import _ from "lodash";

export const allEmptyItems = (...items) => {
  return items.every(item => !item || _.isEmpty(item));
};
