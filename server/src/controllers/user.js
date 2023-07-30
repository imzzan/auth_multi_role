import argon2 from "argon2";
import Users from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    res.status(400).json({ message: "Password Tidak Sesuai" });
  }
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ message: "Register Berhasil" });
  } catch (error) {
    res.status(500).json({
      errorMessage: error,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const user = await Users.findOne({
    where: {
      uuid: userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak di temukan" });
  }
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password == "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) {
    return res.status(400).json({ message: "Password Tidak Sesuai" });
  }
  try {
    await Users.update({
        name : name,
        email : email,
        password : hashPassword,
        role : role
    },
    {
        where : {
            id : user.id
        }
    })
    res.status(200).json({message : "Update user berhasil"})
  } catch (error) {
    res.status(500).json({message : error})
  }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await Users.findOne({
        where : {
            uuid : userId
        }
    })
    if(!user) {
        return res.status(404).json({message : "User Tidak di temukan"})
    }
    try {
        await Users.destroy({
            where : {
                id : user.id
            }
        })
        res.status(200).json({message : "User berhasil di hapus"})
    } catch (error) {
        res.status(500).json({message : error})
    }
};
