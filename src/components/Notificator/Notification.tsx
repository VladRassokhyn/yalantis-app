import React from "react";
import ok from '../../static/ok.svg';
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "../../lib/store/hooks";
import { selectById } from "../../lib/store/notoficationSlice";

type TProps = {
  notificationId: EntityId;
  deleteFn: () => void
};

export const Notification: React.FC<TProps> = ({ notificationId, deleteFn }) => {

  const [willDeleted, setWillDeleted] = React.useState(false);

  const notification = useSelector((state) => selectById(state.notification, notificationId))

  const handlerClick = () => {
    setWillDeleted(true);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setWillDeleted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (willDeleted) {
      let timer = setTimeout(() => {
        deleteFn();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [willDeleted]);

  if (notification) {
    return (
      <div
        onClick={handlerClick}
        className={`notification-wrapper ${
          willDeleted && 'delete-notification'
        } ${notification.type}`}
      >
        <img src={ok} alt={''} />
        <h1>{notification.label}</h1>
      </div>
    );
  } else return null
};
