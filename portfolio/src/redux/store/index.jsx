import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import portfolioReducer, {
  portfolioService,
} from "../services/portfolioService";

import userReducer, {
  userService,
} from "../services/userService";

const reducer = {
  [userService.reducerPath]: userReducer,
  [portfolioService.reducerPath]: portfolioReducer,
};

export const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(portfolioService.middleware)
      .concat(userService.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
