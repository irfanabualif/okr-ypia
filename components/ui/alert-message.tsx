"use client";

import { useEffect, useState } from "react";

type Props = {
  type: "success" | "error";
  message: string;
};

export function AlertMessage({ type, message }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // hilang setelah 3 detik

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

return (
  <div
    className={`rounded-lg border px-4 py-3 text-sm flex items-start gap-2 ${
      type === "success"
        ? "border-green-200 bg-green-50 text-green-800"
        : "border-red-200 bg-red-50 text-red-800"
    }`}
  >
    <span className="mt-[2px] text-base">
      {type === "success" ? "✔" : "⚠"}
    </span>
    <span>{message}</span>
  </div>
);
}