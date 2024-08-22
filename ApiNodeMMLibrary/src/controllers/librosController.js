const librosService = require('../services/librosService');
const responseHelper = require('../utils/responseHelper');

exports.getAllLibros = async (req, res) => {
  try {
    const libros = await librosService.getAllLibros();
    responseHelper.sendSuccess(res, libros);
  } catch (error) {
    responseHelper.sendError(res, 'Error al obtener libros', error);
  }
};

exports.getLibroById = async (req, res) => {
  try {
    const libro = await librosService.getLibroById(req.params.id);
    if (!libro) {
      responseHelper.sendNotFound(res, 'Libro no encontrado');
    } else {
      responseHelper.sendSuccess(res, libro);
    }
  } catch (error) {
    responseHelper.sendError(res, 'Error al obtener libro', error);
  }
};

exports.createLibro = async (req, res) => {
  try {
    const libro = await librosService.createLibro(req.body);
    responseHelper.sendCreated(res, libro);
  } catch (error) {
    responseHelper.sendError(res, 'Error al crear libro', error);
  }
};

exports.updateLibro = async (req, res) => {
  try {
    await librosService.updateLibro(req.params.id, req.body);
    responseHelper.sendSuccess(res, 'Libro actualizado con éxito');
  } catch (error) {
    responseHelper.sendError(res, 'Error al actualizar libro', error);
  }
};

exports.deleteLibro = async (req, res) => {
  try {
    await librosService.deleteLibro(req.params.id);
    responseHelper.sendSuccess(res, 'Libro eliminado con éxito');
  } catch (error) {
    responseHelper.sendError(res, 'Error al eliminar libro', error);
  }
};
