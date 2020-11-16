import React from "react";
import "./index.css";
const InputTextArea = ({
  label,
  placeholder,
  withBottomBorder,
  value,
  setValue,
}) => {
  return (
    <div
      className={`input-text-area ${
        withBottomBorder && "input-text-area-border"
      }`}
    >
      <div>
        <p>{label}</p>
      </div>
      <div>
        <textarea
          rows="5"
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

export default InputTextArea;
