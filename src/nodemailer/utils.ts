import Mail from 'nodemailer/lib/mailer/index.js';
import transporter from './config.js';

export const sendMail = (mailData: any) => {
  const sendMailOptions: Mail.Options = {
    from: process.env.MAIL,
    to: ['rdmadeira2@gmail.com', 'rodrigo@tevelam.com.ar'],
    subject: 'Pedido registrado con suceso',
    text: `Pedido n° ${mailData._id}`,
  };

  transporter.sendMail(sendMailOptions, (error, info) => {});
};
