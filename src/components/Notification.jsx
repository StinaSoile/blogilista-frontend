const Notification = (props) => {
  //   return <div>kissa</div>;
  if (!props.notification) {
    return null;
  }
  if (props.notification.type === "notification") {
    return <div className="notif">{props.notification.message}</div>;
  }
  if (props.notification.type === "error") {
    return <div className="error">{props.notification.message}</div>;
  }
};

export default Notification;
