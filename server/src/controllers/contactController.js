import ContactMessage from '../models/ContactMessage.js';
import { isDatabaseConnected } from '../config/db.js';

const memoryMessages = [];

export async function createContactMessage(req, res) {
  const payload = req.body;

  try {
    if (isDatabaseConnected()) {
      const createdMessage = await ContactMessage.create(payload);

      return res.status(201).json({
        message: 'Message submitted successfully.',
        data: {
          id: createdMessage._id,
          status: createdMessage.status,
          createdAt: createdMessage.createdAt,
        },
      });
    }

    const fallbackMessage = {
      id: `memory-${Date.now()}`,
      ...payload,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    memoryMessages.push(fallbackMessage);

    return res.status(201).json({
      message: 'Message submitted successfully in temporary storage mode.',
      data: {
        id: fallbackMessage.id,
        status: fallbackMessage.status,
        createdAt: fallbackMessage.createdAt,
        storage: 'memory',
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to submit message.',
      error: error.message,
    });
  }
}

export function getTemporaryMessages(_req, res) {
  return res.status(200).json(memoryMessages);
}
