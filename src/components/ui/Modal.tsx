import { IconWarning } from "./Icons";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Confirmation dialog shown before deleting a service.
// Clicking outside or pressing Cancel will close it without deleting.
export default function Modal({
  title,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    // Dark overlay behind the dialog
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm fade-in">
        {/* Warning icon */}
        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
          <IconWarning className="w-6 h-6 text-rose-500" />
        </div>

        <h2
          id="modal-title"
          className="text-lg font-bold text-slate-800 mb-1.5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>

        {/* Actions — Cancel is secondary, Delete is destructive */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
