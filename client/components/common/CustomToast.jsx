import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

export const CustomToastContent = ({ title, message, type = "success" }) => {
  const isSuccess = type === "success";
  
  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <div className="flex items-center gap-2">
        {isSuccess ? (
          <Icon icon="mdi:check-circle" className="text-green-500 text-lg" />
        ) : (
          <Icon icon="mdi:alert-octagon" className="text-red-500 text-lg" />
        )}
        <h4 className="text-[#1a202c] font-bold text-[15px]">{title}</h4>
      </div>
      <p className="text-[#6b7280] text-[13px] pl-6 pr-2 leading-snug">
        {message}
      </p>
    </div>
  );
};

export const showCustomToast = (title, message, type = "success") => {
  toast(<CustomToastContent title={title} message={message} type={type} />, {
    style: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '16px 12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      margin: '8px',
    },
    closeButton: ({ closeToast }) => (
      <button onClick={closeToast} className="text-gray-400 hover:text-gray-600 self-start mt-0.5 cursor-pointer">
        <Icon icon="mdi:close" className="text-lg" />
      </button>
    ),
    hideProgressBar: true,
    icon: false,
    autoClose: 5000,
    className: "custom-toast-container", // allows overriding toastify padding if needed
  });
};
