import { UPDATA_USERNAME } from "./constant";

const reducer = (state, action) => {
  const { type, data } = action;

  switch (type) {
    case UPDATA_USERNAME:
      return {
        ...data,
        userName: data.userName,
      };
    default:
      return state;
  }
};

export default reducer;
