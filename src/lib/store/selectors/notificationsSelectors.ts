import { notificationAdapter } from "../notoficationSlice";
import { RootState } from '../store';

export const { selectById, selectIds } = notificationAdapter.getSelectors<RootState>(
  (state) => state.notification
);