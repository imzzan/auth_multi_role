import Users from "../models/userModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const user = await Users.findOne({
        where : {
            email : req.body.email
        }
    })
    if(!user) {
        return res.status(404).json({message : "User Tidak ditemukan"})
    }
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) {
        return res.status(400).json({message : "Password Salah"})
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role})
}

export const me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({message : "Anda harus masuk pada akun anda"})
    }
    const user = await Users.findOne({
        attributes : ["uuid", "name", "email", "role"],
        where : {
            uuid : req.session.userId
        }
    })
    if(!user) return res.status(404).json({message : "User tidak di temukan"});
    res.status(200).json(user)
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({message : "Tidak dapat logout"})
    })
    res.status(200).json({message : "Anda Telah Logout"})
}