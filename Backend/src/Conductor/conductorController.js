import { db } from "../config/db.js";

export async function getAllConductor (req, res) {
    const [resultConductor] = await db.execute("SELECT * FROM conductor");

    res.json({
        success: true,
        conductor: resultConductor
    });

}

export async function getConductorById (req, res) {
    const id = Number(req.params.id);

    const [resultConductor] = await db.execute("SELECT * FROM conductor WHERE id = ?" ,[
        id
    ]);

    if(resultConductor.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un conductor con ese id."
        })
    }

    res.json({
        success: true,
        conductor: resultConductor
    })

}

export async function createConductor (req, res) {
    const { nombre, apellido, licencia, fecha_de_vencimiento } = req.body;
    const dni = Number(req.body.dni);


    const [resultConductor] = await db.execute("INSERT INTO conductor (nombre, apellido, dni, licencia, fecha_de_vencimiento) VALUES(?, ?, ?, ?, ?)" ,[
        nombre, apellido, dni, licencia, fecha_de_vencimiento
    ]);

    if(resultConductor.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el Conductor."
        });
    }

    res.json({
        success: true,
        data: {id: resultConductor.insertId, nombre, apellido, dni, licencia, fecha_de_vencimiento},
        message: "Conductor creado creado con exito."
    });

}

export async function updateConductor (req, res) {
    const id = Number(req.params.id);
    const { nombre, apellido, licencia, fecha_de_vencimiento } = req.body;
    const dni = Number(req.body.dni);

    const [resultConductor] = await db.execute("UPDATE conductor SET nombre = ?, apellido = ?, dni = ?, licencia = ?, fecha_de_vencimiento = ? WHERE id = ?" ,[
        nombre, apellido, dni, licencia, fecha_de_vencimiento, id
    ]);

    if(resultConductor.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo modificar el conductor."
        });
    }

    res.json({
        success: true,
        data: {id, nombre, apellido, dni, licencia, fecha_de_vencimiento},
        message: "Conductor modificado con exito."
    });
    

}

export async function deleteConductor (req, res) {
    const id = Number(req.params.id);

    const [resultConductor] = await db.execute("DELETE FROM conductor WHERE id = ?" ,[
        id
    ]);

    if(resultConductor.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro vehiculo con ese id."
        })
    }

    res.json({
        success: true,
        message: resultConductor
    })

}