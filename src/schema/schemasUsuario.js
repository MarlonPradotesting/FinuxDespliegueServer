const Joi = require('joi');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schemasUsuario = Joi.object({
  nombre: Joi.string()
    .min(1)
    .max(112)
    .pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de caracteres.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos 1 carácter.',
      'string.max': 'El nombre debe tener como máximo 112 caracteres.',
      'string.pattern.base': 'El nombre solo puede contener letras y espacios con tildes.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),

  apellido: Joi.string()
    .min(1)
    .max(112)
    .pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.base': 'El apellido debe ser una cadena de caracteres.',
      'string.empty': 'El apellido no puede estar vacío.',
      'string.min': 'El apellido debe tener al menos 1 carácter.',
      'string.max': 'El apellido debe tener como máximo 112 caracteres.',
      'string.pattern.base': 'El apellido solo puede contener letras y espacios con tildes.',
      'any.required': 'El apellido es un campo obligatorio.'
    }),

  telefono: Joi.string()
    .pattern(/^\+\d{11,15}$/) // Expresión regular para validar el formato +57xxxxxxxxx
    .required()
    .messages({
      'string.base': 'El número de teléfono debe ser una cadena de caracteres.',
      'string.pattern.base': 'El número de teléfono debe tener el formato +57xxxxxxxxx.',
      'any.required': 'El número de teléfono es un campo obligatorio.'
    }),

  correo: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({
      'string.base': 'El correo electrónico debe ser una cadena de caracteres.',
      'string.empty': 'El correo electrónico no puede estar vacío.',
      'string.pattern.base': 'El correo electrónico debe tener un formato válido.',
      'any.required': 'El correo electrónico es un campo obligatorio.'
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.base': 'La contraseña debe ser una cadena de caracteres.',
      'string.empty': 'La contraseña no puede estar vacía.',
      'string.min': 'La contraseña debe tener al menos 8 caracteres.',
      'any.required': 'La contraseña es un campo obligatorio.'
    }),

  ppassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'La confirmación de contraseña debe ser igual a la contraseña ingresada.',
      'any.required': 'La confirmación de contraseña es un campo obligatorio.'
    }),

  rol: Joi.number()
    .valid(0, 1, 2, 3,70)
    .required()
    .messages({
      'number.base': 'El rol debe ser un número.',
      'number.valid': 'El rol debe ser 0, 1, 2 o 3.',
      'any.required': 'El rol es un campo obligatorio.'
    }),

  facultad: Joi.string()
    .when('rol', {
      is: 0,
      then: Joi.string().required().messages({
        'string.base': 'La facultad debe ser una cadena de caracteres.',
        'string.empty': 'La facultad no puede estar vacía.',
        'any.required': 'La facultad es un campo obligatorio.'
      }),
      otherwise: Joi.forbidden()
    }),

  nombreFacultad: Joi.string()
    .when('rol', {
      is: 1,
      then: Joi.string().required().messages({
        'string.base': 'El nombre de la facultad debe ser una cadena de caracteres.',
        'string.empty': 'El nombre de la facultad no puede estar vacío.',
        'any.required': 'El nombre de la facultad es un campo obligatorio.'
      }),
      otherwise: Joi.forbidden()
    }),

    nombreGrupoInv: Joi.string()
    .when('rol', {
      is: 2,
      then: Joi.string().required().messages({
        'string.base': 'El nombre del grupo de investigación debe ser una cadena de caracteres.',
        'string.empty': 'El nombre del grupo de investigación no puede estar vacío.',
        'any.required': 'El nombre del grupo de investigación es un campo obligatorio.'
      }),
      otherwise: Joi.forbidden()
    }),

    nombreDirPrograma: Joi.string()
    .when('rol', {
      is: 3,
      then: Joi.string().required().messages({
        'string.base': 'El nombre del director debe ser una cadena de caracteres.',
        'string.empty': 'El nombre del director no puede estar vacío.',
        'any.required': 'El nombre del director es un campo obligatorio.'
      }),
      otherwise: Joi.forbidden()
    })
});

module.exports = schemasUsuario;
