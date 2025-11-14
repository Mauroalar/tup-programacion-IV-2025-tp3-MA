import { db } from "../config/db.js";
import bcrypt from "bcrypt";


export async function getAllUsuario (req, res) {
    const [resultUsuario] = await db.execute("SELECT * FROM usuario");

    res.json({
        success: true,
        usuario: resultUsuario.map((u)=> ({...u, password_hash: undefined}))
    });

}

export async function getUsuarioById (req, res) {
    const id = Number(req.params.id);

    const [resultUsuario] = await db.execute("SELECT id, nombre, email FROM usuario WHERE id = ?" ,[
        id
    ]);

    if(resultUsuario.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro usuario con ese id."
        })
    }

    res.json({
        success: true,
        usuario: resultUsuario
    })

}

export async function createUsuario (req, res) {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const [resultUsuario] = await db.execute(
      "INSERT INTO usuario (nombre, email, password_hash) VALUES (?,?,?)",
      [ nombre, email, hashedPassword]
    );

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el usuario."
        });
    }

    res.json({
        success: true,
        data: {id: resultUsuario.insertId, nombre},
        message: "Usuario creado creado con exito."
    });
    

}

export async function updateUsuario (req, res) {
    const id = Number(req.params.id);
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const [resultUsuario] = await db.execute(
      "INSERT INTO usuario (nombre, email, password_hash) VALUES (?,?,?)",
      [ nombre, email, hashedPassword]
    );

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo modificar el usuario."
        });
    }

    res.json({
        success: true,
        data: {id: resultUsuario.insertId, nombre},
        message: "Usuario creado modificar con exito."
    });
    

}

export async function deleteUsuario (req, res) {
    const id = Number(req.params.id);

    const [resultUsuario] = await db.execute("DELETE FROM usuario WHERE id = ?" ,[
        id
    ]);

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro usuario con ese id."
        })
    }

    res.json({
        success: true,
        message: resultUsuario
    })

}