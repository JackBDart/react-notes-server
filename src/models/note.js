import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema({
  title: String,
  x: Number,
  y: Number,
  zIndex: Number,
  text: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

NoteSchema.virtual('score').get(function scoreCalc() {
  return this.upvotes - this.downvotes;
});

// create model class
const NoteModel = mongoose.model('Poll', NoteSchema);

export default NoteModel;
