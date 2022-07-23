import React from "react";

const onChangeFunction = (setForm: any) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
};

export { onChangeFunction };
