import React from "react";

export const EmployerRegister = ({onRegisterSave}) => {
  const [name, setName] = React.useState("");
  const onInputChange = (e) => {
    setName(e.target.value)
  };
  const onSave = () => {
    onRegisterSave(name)
  }
  return (
    <div>
      <div>
        <input type="text" value={name} onChange={onInputChange} />
      </div>
      <div>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};
