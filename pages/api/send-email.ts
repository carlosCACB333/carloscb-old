// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import { Contact } from '../../interface';
import { env } from '../../utils/env';
import { getTemplateEmail } from '../../utils/getTemplateEmail';

type Data = {
  message: string;
};

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  try {
    const { name, email, message, affair, phone } = req.body as Contact;
    console.log(name, email, message, affair, phone);
    console.log(env.email.api);

    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.email.from,
        pass: env.email.api,
      },
    });

    await transporter.sendMail({
      from: env.email.from,
      to: env.email.from,
      subject: affair,
      html: getTemplateEmail(name, email, message, phone),
    });

    return res.status(200).json({ message: 'Gracias por contactarnos, pronto nos pondremos en contacto contigo' });
  } catch (error) {
    return res.status(500).json({ message: 'Tuvimos un problema al enviar tu mensaje. Por favor, intenta más tarde.' });
  }
}
