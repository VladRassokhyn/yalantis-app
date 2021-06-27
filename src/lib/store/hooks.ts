import {
  TypedUseSelectorHook,
  useSelector as untypedSelector,
} from 'react-redux';
import { RootState } from './store';

export const useSelector: TypedUseSelectorHook<RootState> = untypedSelector;
