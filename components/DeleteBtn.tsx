import React from "react";

type DeleteBtnType = {
  label: string;
  type?: "button" | "reset" | "submit";
  className: string;
  onClick: any;
};

const DeleteBtn: React.FC<DeleteBtnType> = ({
  label,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default DeleteBtn;
