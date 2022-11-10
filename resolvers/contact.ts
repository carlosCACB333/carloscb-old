import { joiResolver } from '@hookform/resolvers/joi';
import { contactSchema } from '../schema';

export const contactResolver = joiResolver(contactSchema);
