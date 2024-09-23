import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  ariaLabel,
  className,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

export default Button;
