import nodemailer, { createTestAccount } from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Tentei fazer isso
      const account = await nodemailer.createTestAccount();
    } catch (error) {
      console.log(error);
    }

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      // tls: { Tentei fazer isso
      //   rejectUnauthorized: false,
      // },
    });

    const message = await transporter.sendMail({
      from: 'equipe@apivendas.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
