import { v4 as uuidv4 } from "uuid";
import { TNotification } from "../types";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const notificationAdapter = createEntityAdapter<TNotification>({});

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    notificationAdded: (state, action) => {
      const notification = {
        type: action.payload.type,
        isActive: true,
        label: action.payload.label,
        id: uuidv4()
      };
      notificationAdapter.addOne(state, notification);
    },
    notificationRemoved: (state, action) => {
      notificationAdapter.removeOne(state, action.payload);
    }
  }
});

export const notificationReducer = notificationSlice.reducer;

export const { notificationAdded, notificationRemoved } = notificationSlice.actions;

export const { selectById } = notificationAdapter.getSelectors();

export const selectNotificationIds = (state: RootState) => state.notification.ids;
