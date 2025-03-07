const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'animales.cjws6s2mgec4.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: '23081997a-',
  database: 'animales'
});

const obtenerAnimales = async (filterParams = {}) => {
  try {
    let query = 'SELECT * FROM animales';
    let filters = [];
    let values = [];

    if (filterParams.alimentacion) {
      filters.push(`alimentacion LIKE ?`);
      values.push(`%${filterParams.alimentacion}%`);
    }

    if (filterParams.origen) {
      filters.push(`(origen LIKE ? OR origen LIKE ?)`);
      values.push(`%${filterParams.origen}%`, `%mundial%`);
    }

    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    const [results] = await connection.promise().query(query, values);

    if (!results || results.length === 0) {
      return { status: "OK", data: [] };
    }

    return { status: "OK", data: results };
  } catch (error) {
    console.error('Error en obtenerAnimales:', error);
    throw { status: 500, message: error.message || error };
  }
};


const crearAnimal = async (nuevoAnimal) => {
  try {
    const query = 'SELECT * FROM animales WHERE nombre = ?';
    const [results] = await connection.promise().query(query, [nuevoAnimal.nombre]);

    if (results.length > 0) {
      throw { status: 400, message: `El animal con el nombre '${nuevoAnimal.nombre}' ya existe` };
    }

    const insertQuery = `
      INSERT INTO animales (nombre, nombreCientifico, alimentacion, origen, foto, creadoEn, actualizadoEn)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await connection.promise().query(insertQuery, [
      nuevoAnimal.nombre,
      nuevoAnimal.nombreCientifico,
      nuevoAnimal.alimentacion,
      nuevoAnimal.origen,
      nuevoAnimal.foto,
      fecha,
      fecha,
    ]);

    return { ...nuevoAnimal, creadoEn: fecha, actualizadoEn: fecha };
  } catch (error) {
    throw { status: 500, message: error.message || error };
  }
};

const obtenerAnimal = async (animalId) => {
  try {
    const query = 'SELECT * FROM animales WHERE id = ?';
    const [results] = await connection.promise().query(query, [animalId]);

    if (!results.length) {
      throw { status: 404, message: `No podemos encontrar un animal con el id '${animalId}'` };
    }

    return results[0];
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const actualizarAnimal = async (animalId, cambios) => {
  try {
    
    if (cambios.nombre) {
      const query = 'SELECT * FROM animales WHERE nombre = ? AND id != ?';
      const [results] = await connection.promise().query(query, [cambios.nombre, animalId]);

      if (results.length > 0) {
        throw { status: 400, message: `El animal con el nombre '${cambios.nombre}' ya existe` };
      }
    }

    
    const campos = [];
    const valores = [];

    Object.keys(cambios).forEach(key => {
      if (key !== 'id') { 
        campos.push(`${key} = ?`);
        valores.push(cambios[key]);
      }
    });

    if (campos.length === 0) {
      throw { status: 400, message: 'No se proporcionaron campos para actualizar' };
    }

    
    campos.push('actualizadoEn = ?');
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
    valores.push(fecha);

    
    const updateQuery = `
      UPDATE animales
      SET ${campos.join(', ')}
      WHERE id = ?
    `;

    valores.push(animalId);

   
    await connection.promise().query(updateQuery, valores);

    return { ...cambios, actualizadoEn: fecha, id: animalId };
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const eliminarAnimal = async (animalId) => {
  try {
    const query = 'SELECT * FROM animales WHERE id = ?';
    const [results] = await connection.promise().query(query, [animalId]);

    if (!results.length) {
      throw { status: 404, message: `No se encuentra un animal con el id '${animalId}'` };
    }

    const deleteQuery = 'DELETE FROM animales WHERE id = ?';
    await connection.promise().query(deleteQuery, [animalId]);

    return { message: `El animal con ID ${animalId} ha sido eliminado` };
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

module.exports = {
  obtenerAnimales,
  crearAnimal,
  obtenerAnimal,
  actualizarAnimal,
  eliminarAnimal
};
