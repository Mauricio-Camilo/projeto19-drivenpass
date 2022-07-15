import joi from 'joi';
import { Wifi } from '@prisma/client';

type CreateWifiData = Omit<Wifi,"id"|"userId">

const wifiSchema = joi.object<CreateWifiData>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required()
});

export default wifiSchema;