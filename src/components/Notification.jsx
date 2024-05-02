let timeoutId;
const Notification = ({ notification, setNotification }) => {
  //   return <div>kissa</div>;
  if (!notification) {
    return null;
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    setNotification(null);
  }, 5000);

  let className = "notif";
  if (notification.type === "error") {
    className = "error";
  }
  return <div className={className}>{notification.message}</div>;
};

export default Notification;
