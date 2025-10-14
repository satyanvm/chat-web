"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  appName?: string;
  onClick?: () => void
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className} 
      onClick={() => {onclick}}
    >
      {children}
    </button>
  );
};
