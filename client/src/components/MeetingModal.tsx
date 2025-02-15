import React, { useRef } from "react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  image?: string;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  title,
  className = "",
  children,
  handleClick,
  buttonText = "Close",
  image,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  // Open Modal

  // Close Modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose(); // Call the parent close function
  };

  return (
    <>
      {/* Modal */}
      <dialog open={isOpen} ref={modalRef} className={`modal ${className}`}>
        <div className="modal-box bg-white shadow-md">
          {/* Close Button */}
          <button
            type="button"
            className="cursor-pointer absolute right-4 top-2"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Modal Image (Optional) */}
          {image && (
            <img
              src={image}
              alt="Modal"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          {/* Modal Title */}
          <h3 className="font-bold text-lg">{title}</h3>

          {/* Modal Content */}
          <div className="py-4">{children}</div>

          {/* Footer Buttons */}
          <div className="modal-action">
            {handleClick && (
              <button
                type="button"
                className="text-white bg-blue-500 rounded w-full p-1 cursor-pointer"
                onClick={handleClick}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MeetingModal;
