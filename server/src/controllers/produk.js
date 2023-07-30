import Produk from "../models/produkModel.js";
import Users from "../models/userModel.js";
import { Op } from "sequelize";

export const getProduk = async (req, res) => {
  try {
    let response;
    if (req.role == "admin") {
      response = await Produk.findAll({
        attributes: ["uuid", "name", "price"],
        include: {
          model: Users,
          attributes: ["name", "email"],
        },
      });
    } else {
      response = await Produk.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: {
          model: Users,
          attributes: ["name", "email"],
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk)
      return res.status(404).json({ message: "Data tidak ditumkan" });
    let response;
    if (req.role === "admin") {
      response = await Produk.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: produk.id,
        },
        include: {
          model: Users,
          attributes: ["name", "email"],
        },
      });
    } else {
      response = await Produk.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: produk.id }, { id: req.userId }],
        },
        include: {
          model: Users,
          attributes: ["name", "email"],
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProduk = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Produk.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(200).json({ message: "Produk berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk)
      return res.status(404).json({ message: "Data Tidak di temukan" });
    const { name, price } = req.body;
    if (req.role === "admin") {
      await Produk.update(
        { name, price },
        {
          where: {
            id: produk.id,
          },
        }
      );
    } else {
      if (req.userId !== produk.id)
        return res.status(403).json({ message: "Access not allowed" });
      await Produk.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: produk.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(201).json({ message: "Produk berhasil di Update" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk)
      return res.status(404).json({ message: "Data tidak di temukan" });
    if (req.role === "admin") {
      await Produk.destroy({
        where: {
          id: produk.id,
        },
      });
    } else {
      if (req.userId !== produk.id)
        return res.status(403).json({ message: "Access not Allowed" });
      await Produk.destroy({
        where: {
          [Op.and]: [{ id: produk.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ message: "Data Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
