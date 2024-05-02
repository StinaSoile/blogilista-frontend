import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <button onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
