import nodemailer from "nodemailer";


const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log(datos)
      const {email, nombre, token} = datos;
      const info = await transporter.sendMail({
          from: "apv - administrador de pacientes de veterinaria",
          to: email, 
          subject: "comprueba tu cuenta en apv",
          text: "compruebe su cuenta apv",
          html: `<p>Hola: ${nombre}, comprueba tu cuenta en apv </p>
          <p>Tu cuenta esta lista, solo debes comprobarla en el siguiente enlace:
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}">comprobar cuenta</a> </p>
          <p>si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`,
      });
      console.log("mensaje enviado: %s", info.messageId);
};

export default emailRegistro;