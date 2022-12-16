import React, { createContext, useContext, useReducer } from "react";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface IUserState {
  user_id: number | null;
  token: string | null;
  username: string | null;
}

interface IAuthState {
  user: IUserState | null;
}

interface IAuthContext {
  setToken: (user: IAuthState) => void;
  removeToken: () => void;
}

const initialState: IAuthState = {
  user: null,
};

export const AuthContext = createContext<IAuthState & IAuthContext>({
  ...initialState,
  setToken: () => {},
  removeToken: () => {},
});

export const AuthReducer = (
  state: IAuthState,
  action: Actions<ActionTypes>
) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, user: action?.payload };
    case ActionTypes.REMOVE_TOKEN:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setToken: (user) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.SET_TOKEN, payload: user })
          ),
        removeToken: () =>
          setImmediate(() => dispatch({ type: ActionTypes.SET_TOKEN })),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
