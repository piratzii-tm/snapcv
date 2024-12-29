import React from "react";

export const CustomDialog = ({
  text,
  handleCancel,
  handlePrimaryButton,
  primaryBtnText,
}: {
  text: string;
  handleCancel?: () => void;
  handlePrimaryButton?: () => void;
  primaryBtnText?: string;
}) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
    <dialog open={true} className="bg-white p-6 rounded-lg shadow-lg w-96">
      <p className="text-lg font-medium text-gray-800 mb-8 text-center">
        {text}
      </p>
      <div className="flex justify-center gap-4">
        {handleCancel && (
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        {handlePrimaryButton && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handlePrimaryButton}
          >
            {primaryBtnText ?? "Sure"}
          </button>
        )}
      </div>
    </dialog>
  </div>
);
