import { Note } from '@prisma/client';
import joi from 'joi';

type CreateNoteData = Omit<Note,"id"|"userId">

const titleMaximunCaracters = 50;
const noteMaximunCaracters = 1000;

const notesSchema = joi.object<CreateNoteData>({
  title: joi.string().required().max(titleMaximunCaracters),
  note: joi.string().required().max(noteMaximunCaracters),
});

export default notesSchema;