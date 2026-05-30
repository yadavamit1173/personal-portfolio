import mongoose from 'mongoose';

const achievementStatSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const achievementPlatformSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false },
);

const codingAchievementSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    stats: {
      type: [achievementStatSchema],
      default: [],
    },
    platforms: {
      type: [achievementPlatformSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const CodingAchievement =
  mongoose.models.CodingAchievement ||
  mongoose.model('CodingAchievement', codingAchievementSchema);

export default CodingAchievement;
