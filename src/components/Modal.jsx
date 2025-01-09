import React from "react";
import { GrClose } from "react-icons/gr"; // Çarpı ikonu için doğru import
import { useDispatch } from "react-redux";
import { modalFunc } from "../redux/modalSlice"; // Redux'tan modalFunc'ı doğru import et

const Modal = ({ title, content, btnText, btnFunc }) => {
  const dispatch = useDispatch(); // Redux dispatch kullanmak için

  const handleClose = () => {
    dispatch(modalFunc()); // Modal'ı kapatmak için modalFunc() aksiyonunu çağır
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center">
      <div className="w-1/3 bg-white shadow-lg rounded-md p-4">
        <div className="border-b py-3 flex items-center justify-between">
          <div className="text-2xl">{title}</div>
          <GrClose onClick={handleClose} size={24} />{" "}
          {/* Çarpıya tıklandığında handleClose çağrılır */}
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;
