


const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');
const { validateLibro } = require('../middlewares/librosMiddleware.js');

/**
 * @openapi
 * /api/libros:
 *   get:
 *     summary: Obtiene todos los libros
 *     description: Recupera una lista de todos los libros en la biblioteca. Esta operación devuelve un array de libros, cada uno con detalles completos.
 *     responses:
 *       '200':
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del libro
 *                   titulo:
 *                     type: string
 *                     description: Título del libro
 *                   autor:
 *                     type: string
 *                     description: Autor del libro
 *                   anio_publicacion:
 *                     type: integer
 *                     format: year
 *                     description: Año de publicación del libro
 *                   genero:
 *                     type: string
 *                     description: Género del libro
 *                   isbn:
 *                     type: string
 *                     description: ISBN del libro
 *                   creado_en:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que el libro fue creado en la base de datos
 *       '500':
 *         description: Error del servidor
 */
router.get('/', librosController.getAllLibros);

/**
 * @openapi
 * /api/libros/{id}:
 *   get:
 *     summary: Obtiene un libro por ID
 *     description: Recupera los detalles de un libro específico usando su ID. La respuesta contiene información completa sobre el libro.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro a recuperar
 *     responses:
 *       '200':
 *         description: Detalles del libro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del libro
 *                 titulo:
 *                   type: string
 *                   description: Título del libro
 *                 autor:
 *                   type: string
 *                   description: Autor del libro
 *                 anio_publicacion:
 *                   type: integer
 *                   format: year
 *                   description: Año de publicación del libro
 *                 genero:
 *                   type: string
 *                   description: Género del libro
 *                 isbn:
 *                   type: string
 *                   description: ISBN del libro
 *                 creado_en:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora en que el libro fue creado en la base de datos
 *       '404':
 *         description: Libro no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.get('/:id', librosController.getLibroById);

/**
 * @openapi
 * /api/libros:
 *   post:
 *     summary: Crea un nuevo libro
 *     description: Agrega un nuevo libro a la biblioteca. Los datos del libro deben incluir título, autor, y opcionalmente año de publicación, género e ISBN.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del libro
 *               autor:
 *                 type: string
 *                 description: Autor del libro
 *               anio_publicacion:
 *                 type: integer
 *                 format: year
 *                 description: Año de publicación del libro (opcional)
 *               genero:
 *                 type: string
 *                 description: Género del libro (opcional)
 *               isbn:
 *                 type: string
 *                 description: ISBN del libro (opcional, debe ser único)
 *     responses:
 *       '201':
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del libro creado
 *                 titulo:
 *                   type: string
 *                   description: Título del libro
 *                 autor:
 *                   type: string
 *                   description: Autor del libro
 *                 anio_publicacion:
 *                   type: integer
 *                   format: year
 *                   description: Año de publicación del libro
 *                 genero:
 *                   type: string
 *                   description: Género del libro
 *                 isbn:
 *                   type: string
 *                   description: ISBN del libro
 *                 creado_en:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora en que el libro fue creado en la base de datos
 *       '400':
 *         description: Error en los datos proporcionados
 *       '500':
 *         description: Error del servidor
 */
router.post('/', validateLibro, librosController.createLibro);

/**
 * @openapi
 * /api/libros/{id}:
 *   put:
 *     summary: Actualiza un libro existente
 *     description: Modifica los detalles de un libro existente usando su ID. Solo se deben proporcionar los campos que se desean actualizar.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del libro
 *               autor:
 *                 type: string
 *                 description: Autor del libro
 *               anio_publicacion:
 *                 type: integer
 *                 format: year
 *                 description: Año de publicación del libro (opcional)
 *               genero:
 *                 type: string
 *                 description: Género del libro (opcional)
 *               isbn:
 *                 type: string
 *                 description: ISBN del libro (opcional)
 *     responses:
 *       '200':
 *         description: Libro actualizado exitosamente
 *       '400':
 *         description: Error en los datos proporcionados
 *       '404':
 *         description: Libro no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.put('/:id', validateLibro, librosController.updateLibro);

/**
 * @openapi
 * /api/libros/{id}:
 *   delete:
 *     summary: Elimina un libro
 *     description: Elimina un libro de la biblioteca usando su ID. La operación elimina permanentemente el libro.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro a eliminar
 *     responses:
 *       '200':
 *         description: Libro eliminado exitosamente
 *       '404':
 *         description: Libro no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.delete('/:id', librosController.deleteLibro);

module.exports = router;
