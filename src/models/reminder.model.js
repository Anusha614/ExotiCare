import mongoose, { Schema } from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: [
        "feeding",
        "cleaning",
        "medication",
        "vet",
        "weighing",
        "other"
      ],
      required: true
    },

    dueDate: {
      type: Date,
      required: true
    },

    recurring: {
      type: Boolean,
      default: false
    },

    recurrence: {
      type: String,
      enum: ["daily", "weekly", "monthly", null],
      default: null
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const Reminder = mongoose.model("Reminder", reminderSchema)