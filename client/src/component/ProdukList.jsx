import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProdukList = () => {
  const [produk, setProduk] = useState([]);

  const getProduk = async () => {
    const response = await axios.get("http://localhost:5000/produk");
    setProduk(response.data);
  };

  const deleteProduks = async (produkId) => {
    await axios.delete(`http://localhost:5000/produk/${produkId}`);
    getProduk();
  };

  useEffect(() => {
    getProduk();
  }, []);

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item, index) => {
            return (
              <tr key={item.uuid}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.user.name}</td>
                <td>
                  <Link
                    to={`/products/edit/${item.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduks(item.uuid)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukList;
