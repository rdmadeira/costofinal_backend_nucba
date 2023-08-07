import Mail from 'nodemailer/lib/mailer/index.js';
import { MailData } from '../models/dto/mailDataDto.js';

export const sendMailOrder = (mailData: MailData) => {
  let itemsToString = '';

  mailData.items.forEach(
    (item) =>
      (itemsToString += `

      ${item.product.CODIGO} ---- ${item.product.MEDIDA} ---- ${item.quantity} un
      
      `)
  );
  const sendMailOptions: Mail.Options = {
    from: process.env.MAIL,
    to: mailData.email!,
    cc: 'rdmadeira2@gmail.com',
    subject: 'Pedido en CostoFinal registrado con suceso.',
    html: `<h2>Pedido n° ${mailData._id} fue registrado con suceso.</h2>
    <p>Gracias por su pedido en CostoFinal!</p><br>
    <p>Tu pedido está siendo precesado y está en estado pendiente... Recibirás un mensaje confirmando que el mismo está preparado.</p><br>
    <p>En adjunto detalles del pedido</p><br>
    <p>N° de Pedido: ${mailData._id}</p><br>
    <p>Items: </p><br>
    <p>${itemsToString}</p><br>
    <p>Creado el: ${mailData.createdAt}</p><br>
    `,
  };
  return sendMailOptions;
};

export const sendMailLinkPasswordOptions = (email: string, nombre: string) => {
  const sendMailOptions: Mail.Options = {
    from: process.env.MAIL!,
    to: email,
    cc: 'rdmadeira2@gmail.com',
    subject: 'Solicitud de reestablecimento de contraseña',
    html: `
    <h2>Hola ${nombre}!</h2>
    <p>Para definir una nueva contraseña, hacé el clique en el link abajo:</p>
    <p><a href='https://costofinal-backend-810debfecaf4.herokuapp.com/index.html?email=${email}'>Definir una nueva contraseña</a></p>
    `,
  };

  return sendMailOptions;
};
