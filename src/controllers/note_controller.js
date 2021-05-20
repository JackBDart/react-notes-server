import Note from '../models/note';

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = async (id) => {
  try {
    const deleted = await Note.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const createNote = async (fields) => {
  const note = new Note();
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.zIndex = fields.zIndex;
  note.text = fields.text;
  try {
    const savednote = await note.save();
    return savednote;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
