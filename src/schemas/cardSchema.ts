import joi from 'joi';

const cardSchema = joi.object({
  title: joi.string().required(),
  name: joi.string().required(),
  number: joi.string().pattern(/^[0-9]{4}\ [0-9]{4}\ [0-9]{4}\ [0-9]{4}$/),
  securityCode: joi.string().pattern(/^[0-9]{3}$/),
  expirationDate: joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().required().valid("credito","debito","ambos")
});

export default cardSchema;