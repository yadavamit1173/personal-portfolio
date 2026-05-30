import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const skillSchema = new mongoose.Schema(
  {
    categories: {
      type: [skillCategorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;
