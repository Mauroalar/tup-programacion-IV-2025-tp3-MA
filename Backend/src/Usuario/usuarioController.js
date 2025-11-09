import { db } from "../config/db.js";

export async function getAllUsuario (req, res) {
    const [resultUsuario] = await db.execute("SELECT * FROM conductor");

    res.json({
        succes: true,
        usuario: resultUsuario
    });

}

export async function getUsuarioById (req, res) {
    const id = Number(req.params.id);

    const [resultUsuario] = await db.execute("SELECT * FROM usuario WHERE id = ?" ,[
        id
    ]);

    if(resultUsuario.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro usuario con ese id."
        })
    }

    res.json({
        succes: true,
        conductor: resultUsuario
    })

}

export async function createUsuario (req, res) {
    const { nombre, email,  } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
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
        succes: true,
        data: {id: resultUsuario.insertId, nombre, email, password_hash},
        message: "Usuario creado creado con exito."
    });
    

}