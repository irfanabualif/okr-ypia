"use client";

type ConfirmDeleteButtonProps = {
  label: string;
  confirmMessage: string;
  className?: string;
};

export function ConfirmDeleteButton({
  label,
  confirmMessage,
  className,
}: ConfirmDeleteButtonProps) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      className={className}
    >
      {label}
    </button>
  );
}