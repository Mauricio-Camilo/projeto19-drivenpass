import joi from 'joi';

const titleMaximunCaracters = 50;
const noteMaximunCaracters = 1000;

const notesSchema = joi.object({
  title: joi.string().required().max(titleMaximunCaracters),
  note: joi.string().required().max(noteMaximunCaracters),
});

export default notesSchema;