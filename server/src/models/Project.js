import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    impact: {
      type: String,
      trim: true,
    },
    stack: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    repoUrl: {
      type: String,
      trim: true,
      default: '',
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
