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
        success: true,
        vehiculo: resultVehiculo
    })

}

export async function createVehiculo (req, res) {
    const { marca, modelo, patente} = req.body;
    const año = Number(req.body.año);
    const capacidad = Number(req.body.capacidad);

    const [resultVehiculo] = await db.execute("INSERT INTO vehiculo (marca, modelo, patente, año, capacidad_de_carga) VALUES(?, ?, ?, ?, ?)" ,[
        marca, modelo, patente, año, capacidad
    ]);

    if(resultVehiculo.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el vehiculo."
        });
    }

    res.json({
        success: true,
        data: {id: resultVehiculo.insertId, marca, modelo, patente, año, capacidad},
        message: "vehiculo creado creado con exito."
    });

}

export async function updateVehiculo (req, res) {
    const id = Number(req.params.id);
    const { marca, modelo, patente} = req.body;
    const año = Number(req.body.año);
    const capacidad = Number(req.body.capacidad_carga);

    const [resultVehiculo] = await db.execute(
      "UPDATE vehiculo SET marca = ?, modelo = ?, patente = ?, año = ?, capacidad_de_carga = ? WHERE id = ?",
      [marca, modelo, patente, año, capacidad, id]
    );

    if(resultVehiculo.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo modificar el vehiculo."
        });
    }

    res.json({
        success: true,
        data: {id, marca, modelo, patente, año, capacidad},
        message: "Vehiculo modificado con exito."
    });
    

}

export async function deleteVehiculo (req, res) {
    const id = Number(req.params.id);

    const [resultVehiculo] = await db.execute("DELETE FROM vehiculo WHERE id = ?" ,[
        id
    ]);

    if(resultVehiculo.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro vehiculo con ese id."
        })
    }

    res.json({
        success: true,
        message: resultVehiculo
    })

}