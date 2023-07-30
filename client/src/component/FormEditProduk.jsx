import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduk = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getProdukById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/produk/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getProdukById();
  }, []);

  const updateProduk = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/produk/${id}`, {
        name : name,
        price : price
      })
      navigate("/products");
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduk}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduk;
