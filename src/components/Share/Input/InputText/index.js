import React from "react";
import "./index.css";

const InputText = ({
  label,
  placeholder,
  withBottomBorder,
  value,
  setValue,
}) => {
  return (
    <div className={`input-text ${withBottomBorder && "input-text-border"}`}>
      <div>
        <p>{label}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default InputText;
