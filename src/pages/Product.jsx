import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  // console.log("data in redux", data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "", // URL için boş başlangıç değeri
  });

  const onChangeFunc = (e, type) => {
    // console.log("onChange çalıştı:", e.target.value); // Değişen değeri kontrol et

    if (type == "url") {
      // Dosya seçildiyse
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  let loc = location?.search.split("=")[1];
  useEffect(() => {
    if (loc) {
      const foundProduct = data.find((dt) => dt.id == loc);
      if (foundProduct) {
        setProductInfo(data.find((dt) => dt.id == loc));
      }
    }
  }, [loc, data]);
  console.log(location?.search.split("="[1]), "data");

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type={"text"}
        placeholder={"Ürün Adı"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo.price}
        type={"text"}
        placeholder={"Fiyat Ekle"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}
        placeholder={"Resim Seç"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      {productInfo.url && (
        <img
          src={productInfo.url}
          alt="Selected Product"
          className="mt-3 w-48"
        />
      )}
      <Button
        btnText={loc ? "Ürünü Güncelle" : "Ürün Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );
  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>
      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürünü Güncelle" : "Ürün Oluştur"}
        />
      )}
    </div>
  );
};

export default Product;
