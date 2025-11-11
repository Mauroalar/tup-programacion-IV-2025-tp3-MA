import { db } from "../config/db.js";

export async function getAllVehiculo (req, res) {
    const [resultVehiculo] = await db.execute("SELECT * FROM vehiculo");

    res.json({
        success: true,
        vehiculo: resultVehiculo
    });

}

export async function getVehiculoById (req, res) {
    const id = Number(req.params.id);

    const [resultVehiculo] = await db.execute("SELECT * FROM vehiculo WHERE id = ?" ,[
        id
    ]);

    if(resultVehiculo.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un vehiculo con ese id."
        })
    }

    res.json({
        succes: true,
        vehiculo: resultVehiculo
    })

}

export async function createVehiculo (req, res) {
    const { marca, modelo, patente} = req.body;
    const año = Number(req.body.año);
    const capacidad_carga = Number(req.body.capacidad_carga);


    const [resultVehiculo] = await db.execute("INSERT INTO vehiculo (marca, modelo, patente, año, capacidad_carga) VALUES(?, ?, ?, ?, ?)" ,[
        marca, modelo, patente, año, capacidad_carga
    ]);

    if(resultVehiculo.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el vehiculo."
        });
    }

    res.json({
        succes: true,
        data: {id: resultVehiculo.insertId, marca, modelo, patente, año, capacidad_carga},
        message: "vehiculo creado creado con exito."
    });

}