function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactRequest(req, res, next) {
  const { name, email, subject = '', message } = req.body ?? {};
  const errors = [];

  if (!name || !name.trim()) {
    errors.push({ field: 'name', message: 'Name is required.' });
  }

  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!isValidEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Email must be valid.' });
  }

  if (subject && subject.trim().length > 120) {
    errors.push({ field: 'subject', message: 'Subject must be 120 characters or fewer.' });
  }

  if (!message || !message.trim()) {
    errors.push({ field: 'message', message: 'Message is required.' });
  } else if (message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long.' });
  } else if (message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must be 2000 characters or fewer.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors,
    });
  }

  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  };

  return next();
}
