const pool = require('../config/dbConfig'); // Configuración de la base de datos

// Obtener todos los libros
const getAllLibros = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM libros');
    return rows;
  } catch (error) {
    console.error('Error al obtener todos los libros:', error);
    throw new Error('Error al obtener todos los libros');
  }
};

// Obtener un libro por ID
const getLibroById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw new Error(`Libro con ID ${id} no encontrado`);
    }
    return rows[0]; // Devuelve el primer resultado
  } catch (error) {
    console.error(`Error al obtener el libro con ID ${id}:`, error);
    throw new Error(`Error al obtener el libro con ID ${id}`);
  }
};

// Crear un nuevo libro
const createLibro = async (libroData) => {
  const { titulo, autor, anio_publicacion, genero, isbn } = libroData;
  try {
    const [result] = await pool.query(
      'INSERT INTO libros (titulo, autor, anio_publicacion, genero, isbn) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, anio_publicacion, genero, isbn]
    );
    return { id: result.insertId, ...libroData };
  } catch (error) {
    console.error('Error al crear el libro:', error);
    throw new Error('Error al crear el libro');
  }
};

// Actualizar un libro existente
const updateLibro = async (id, libroData) => {
  const { titulo, autor, anio_publicacion, genero, isbn } = libroData;
  try {
    const [result] = await pool.query(
      'UPDATE libros SET titulo = ?, autor = ?, anio_publicacion = ?, genero = ?, isbn = ? WHERE id = ?',
      [titulo, autor, anio_publicacion, genero, isbn, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Libro con ID ${id} no encontrado`);
    }
  } catch (error) {
    console.error(`Error al actualizar el libro con ID ${id}:`, error);
    throw new Error(`Error al actualizar el libro con ID ${id}`);
  }
};

// Eliminar un libro
const deleteLibro = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Libro con ID ${id} no encontrado`);
    }
  } catch (error) {
    console.error(`Error al eliminar el libro con ID ${id}:`, error);
    throw new Error(`Error al eliminar el libro con ID ${id}`);
  }
};

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
};
