import { useAppContext } from "../context";

export const useNotifiContext = () => {
  const { state, dispatch } = useAppContext();
    return [state.NotifiState, dispatch.NotifiDispatch] as const;

};

export const useNotifiDispatch = () => {
  const store = useAppContext();
  return store.dispatch.NotifiDispatch
};

export const useNotifiState = () => {
  const store = useAppContext();
  return store.state.NotifiState
};
