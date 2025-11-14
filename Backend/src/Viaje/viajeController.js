import { db } from "../config/db.js";

export async function getAllViaje (req, res) {
    const consul = (req.query.consul)
    console.log(consul)

    if(!consul) {
        const [resultViaje] = await db.execute("SELECT * FROM viaje")
        return res
        .status(200)
        .json({success: true, viaje: resultViaje})

    } else {
        const [resultViaje] = await db.execute("SELECT * FROM viaje WHERE vehiculo_id = ? " , [consul])
        return res
        .status(200)
        .json({success: true, viaje: resultViaje})
    }
}

export async function getViajeById (req, res) {
    const id = Number(req.params.id);

    const [resultViaje] = await db.execute("SELECT * FROM viaje WHERE id = ?" ,[
        id
    ]);

    if(resultViaje.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un vehiculo con ese id."
        })
    }

    res.json({
        success: true,
        vehiculo: resultViaje
    })

}

export async function createViaje (req, res) {
    const { origen, destino, observaciones} = req.body;
    const vehiculoId = Number(req.body.vehiculo_id);
    const conductorId = Number(req.body.conductor_id);
    const fechaSalida = new Date(req.body.fecha_salida);
    const fechaLlegada = new Date(req.body.fecha_llegada);
    const kilometros = Number(req.body.kilometros);


    const [resultViaje] = await db.execute("INSERT INTO viaje (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) VALUES(?, ?, ?, ?, ?, ?, ?, ?)" ,[
        vehiculoId, conductorId, fechaSalida, fechaLlegada, origen, destino, kilometros, observaciones
    ]);

    if(resultViaje.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el viaje."
        });
    }


    res.json({
        resultViaje,
        success: true,
        data: {id: resultViaje.insertId, vehiculoId, conductorId, fechaSalida, fechaLlegada, origen, destino, kilometros, observaciones},
        message: "viaje creado creado con exito."
    });

}

export async function updateViaje (req, res) {
    const id = Number(req.params.id);
    const { origen, destino, observaciones} = req.body;
    const vehiculoId = Number(req.body.vehiculo_id);
    const conductorId = Number(req.body.conductor_id);
    const fechaSalida = new Date(req.body.fecha_salida);
    const fechaLlegada = new Date(req.body.fecha_llegada);
    const kilometros = Number(req.body.kilometros);


    const [resultViaje] = await db.execute("UPDATE viaje SET vehiculo_id = ?, conductor_id = ?, fecha_salida = ?, fecha_llegada = ?, origen = ?, destino = ?, kilometros = ?, observaciones = ? WHERE id = ?" ,[
        vehiculoId, conductorId, fechaSalida, fechaLlegada, origen, destino, kilometros, observaciones, id
    ]);

    if(resultViaje.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo modificar el viaje."
        });
    }

    res.json({
        success: true,
        data: {id, vehiculoId, conductorId, fechaSalida, fechaLlegada, origen, destino, kilometros, observaciones},
        message: "viaje modificado con exito."
    });

}

export async function deleteViaje (req, res) {
    const id = Number(req.params.id);

    const [resultViaje] = await db.execute("DELETE FROM viaje WHERE id = ?" ,[
        id
    ]);

    if(resultViaje.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro viaje con ese id."
        })
    }

    res.json({
        success: true,
        message: resultViaje
    })

}
