import {
  TypedUseSelectorHook,
  useSelector as untypedSelector,
} from 'react-redux';
import { RootState } from '../store/store';

export const useSelector: TypedUseSelectorHook<RootState> = untypedSelector;
