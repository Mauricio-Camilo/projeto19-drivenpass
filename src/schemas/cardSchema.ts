import joi from 'joi';
import { Card } from '@prisma/client';

type CreateCardData = Omit<Card,"id"|"userId">

const cardSchema = joi.object<CreateCardData>({
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