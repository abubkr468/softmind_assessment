import mongoose from 'mongoose';

export const TASK_STATUSES = ['Pending', 'InProgress', 'Completed'] as const;
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    status: { type: String, enum: TASK_STATUSES, default: 'Pending', index: true },
    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      default: 'Low',
      index: true,
    },

    dueDate: { type: Date },

    attachments: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        originalName: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

taskSchema.index({ assignedTo: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);

