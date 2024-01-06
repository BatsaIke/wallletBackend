// InputWithValidation.jsx

import React, { useState, useEffect } from "react";

export const InputWithValidation = ({ label, value, onChange, placeholder, errorMessage, validate, type, options }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (validate && (value === "" || (type === "select" && value === ""))) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [value, validate, errorMessage, type]);

  return (
    <>
      <p>{label}</p>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
          required
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
          required
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};


