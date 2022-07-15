import joi from 'joi';
import { Credential } from '@prisma/client';

type CreateCredentialData = Omit<Credential,"id"|"userId">

const credentialsSchema = joi.object<CreateCredentialData>({
  title: joi.string().required(),
  url: joi.string().uri(),
  name: joi.string().required(),
  password: joi.string().required()
});

export default credentialsSchema;