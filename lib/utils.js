import _ from "lodash";

export const someEmptyItems = (...items) => {
  return items.some(item => !item || _.isEmpty(item));
};
