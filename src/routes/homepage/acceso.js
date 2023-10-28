const express = require('express');
const router = express.Router();
const pool = require('../../db');
const bcrypt = require('bcryptjs');
const schemasUsuario = require('../../schema/schemasUsuario');
const { compare } = require('bcryptjs');
const SwaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /registro:
 *   get:
 *     summary: Acceso a la Página de Registro
 *     description: Renderiza la vista de registro.
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Vista Renderizada Registro
 */


/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /dashboard:
 *   get:
 *     summary: Acceso a la Página de dashboard
 *     description: Renderiza la vista de dashboard.
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Vista Renderizada Dahboard
 */



//Acceso de la Pagina Principal
router.get('/finux', async (req, res) => {
  //res.render('Registro');
  res.status(200).send({ estado: "OK", message: "Vista Renderizada Inicio" })

});


//Acceso de la Pagina Principal
router.get('/dashboard', async (req, res) => {
  //res.render('Registro');
  res.status(200).send({ estado: "OK", message: "Vista Renderizada DashBoard" })

});



//Direccion a Registro
router.get('/registro', async (req, res) => {
  res.render('Registro');
  //res.status(200).send({ estado: "OK", message: "Vista Renderizada Registro" })
});

/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /finux:
 *   get:
 *     summary: Acceso a la Página de Principal
 *     description: Renderiza la vista Principal del Aplicativo
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Vista Renderizada Pagina Inicial
 */



/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /login:
 *   get:
 *     summary: Acceso a la Página de Inicio de Sesión
 *     description: Renderiza la vista de inicio de sesión.
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Vista Renderizada Login
 */


/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /registro:
 *   post:
 *     summary: Registrar Usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Juan"
 *             apellido: "Pérez"
 *             correo: "juan@example.com"
 *             password: "123455gkd"
 *             ppassword: "123455gkd"
 *             telefono: "+573123456789"
 *             rol: 0
 *             facultad: "Ciencias Basicas SOLO SI ES DOCENTE OSEA ROL 0"
 *             nombreFacultad: "Director de Ciencias Basicas SOLO SI ES DIRECTOR FACULTAD OSEA ROL 1"
 *             nombreGrupoInv: "Director de GIDI Grupo Inv SOLO SI ES DIRECTOR GRUPO INV OSEA ROL 2"
 *             nombreDirPrograma: "Director de ING Agronomica  SOLO SI ES DIRECTOR PROGRAMA  OSEA ROL 3"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Usuario registrado correctamente
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Error de validación en el formulario
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Correo Ya Existe
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

//Direccion a inicio de sesion
router.get('/login', async (req, res) => {
  //res.render('login');
  res.status(200).send({ estado: "OK", message: "Vista Renderizada Login" })
});


//Registro de Usuario
router.post('/registro', async (req, res) => {
  try {
   console.log(req.body);
    // Validar el esquema de usuario (schemasUsuario)
    const { error } = schemasUsuario.validate(req.body);

    if (error) {
      // Manejar errores de validación
      console.log(error.details[0].message);
      req.flash('error', error.details[0].message);
      return res.status(400).send({ estado: "ERROR", message: error.details[0].message });
    } else {
      // Verificar si el correo ya existe
      const busqueda = await pool.query('SELECT * FROM Persona WHERE correo_electronico  = ?', [req.body.correo]);

      if (busqueda.length !== 0) {
        req.flash('error', 'Correo Ya Existe');
        return res.status(400).send({ estado: "ERROR", message: "Correo Ya Existe" });
      } else {
        const hashContraseña = bcrypt.hashSync(req.body.password, 10);
        const { nombre, apellido, correo, telefono } = req.body;

        const usuario = {
          nombre,
          apellidos: apellido,
          correo_electronico: correo,
          numero_telefono: telefono,
          contrasena: hashContraseña,
        }

        const result = await pool.query('INSERT INTO Persona SET ?', [usuario]);
        const nuevoID = result.insertId;

        // Continuación del código...

        if (req.body.rol == 0) {
          console.log('Docente');
          const doc = {
            ID_docente: nuevoID,
            facultad: req.body.facultad
          }
          console.log(doc);
          await pool.query('INSERT INTO Docente set ?', [doc])
          
          req.flash('success', 'Usuario registrado correctamente');
          res.status(200).send({ estado: "OK", message: "Docente registrado correctamente" })
        } 
        
        
        else if (req.body.rol == 1) {
          console.log('Facultad');
          const doc = {
            ID_personaFacultad: nuevoID,
            nombreFacultad: req.body.nombreFacultad
          }
          console.log(doc);
          await pool.query('INSERT INTO dirfacultad set ?', [doc])
          
          req.flash('success', 'Usuario registrado correctamente');
          res.status(200).send({ estado: "OK", message: "Director de Facultad registrado correctamente" })

        } else if (req.body.rol == 2) {
          console.log('Director de Grupo de Investigacion');
          const doc = {
            ID_personaGrupoInv: nuevoID,
            nombreGrupoInv: req.body.nombreGrupoInv
          }
          console.log(doc);
          await pool.query('INSERT INTO dirGrupoInv set ?', [doc])
          
        req.flash('success', 'Usuario registrado correctamente');
          res.status(200).send({ estado: "OK", message: "Director de Grupo de Investigacion registrado correctamente" })

        } else if (req.body.rol == 3) {
          console.log('Director de Programa');
          const doc = {
            ID_personaPrograma: nuevoID,
            nombreDirPrograma: req.body.nombreDirPrograma
          }
          console.log(doc);
          await pool.query('INSERT INTO dirPrograma set ?', [doc])
          
        req.flash('success', 'Usuario registrado correctamente');
          res.status(200).send({ estado: "OK", message: "Director de Programa registrado correctamente" })

        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ estado: "ERROR", message: "Error interno del servidor" });
  }
});


/**
 * @swagger
 * tags:
 *   - name: 'Inicio,Registro y Login'
 *     description: 'Endpoints de acceso a usuario en Finux'
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Verifica las credenciales del usuario y permite iniciar sesión.
 *     tags:
 *       - 'Inicio,Registro y Login'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_electronico:
 *                 type: string
 *                 example: marlontest@gmail.com
 *               password:
 *                 type: string
 *                 example: test1234
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Bienvenido usuario 
 *       400:
 *         description: Error en las credenciales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: La contraseña es incorrecta, ¿olvidaste tu contraseña?
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: No se encontró ningún usuario con el correo electrónico
 */




router.post('/login', async (req,res) =>{

 
  const busqueda = await pool.query('SELECT * FROM Persona  WhERE correo_electronico  = ?', [req.body.correo_electronico])
  
  if (busqueda.length!==0) {
    console.log(busqueda)
    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
    if (bcrypt.compareSync(req.body.password, busqueda[0].contrasena)) {
      
      console.log("Bien Todo")
      //req.flash('success', 'Bienvenido usuario: ' +  busqueda[0].nombre)
      ///res.status(200).redirect('/dashboard');
      res.status(200).send({ estado: "OK", message: "Inicio exitoso: Bienvenido " + busqueda[0].nombre + " " + busqueda[0].apellidos })
    } else {
      console.log("Mal Clave")
      //req.flash('error', 'La contraseña es incorrecta, ¿olvidaste tu contraseña?')
      //res.redirect('/login');
      res.status(400).send({ estado: "ERROR", message: "Contraseña Incorrecta"});
    }
  } else {
    console.log("Mal Correo")
      //req.flash('error', 'No se encontro ningun usuario con el correo electronico')
      res.status(400).send({ estado: "ERROR", message: "Correo Electronico Incorrecto"});
      //res.redirect('/login');
  }
  }) 

module.exports = router;