import { useAppContext } from '../context';

export const useNotifiContext = () => {
  const { state, dispatch } = useAppContext();
  return [state.NotifiState, dispatch.NotifiDispatch] as const;
};
