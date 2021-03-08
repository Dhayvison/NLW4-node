import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';

class SendMailService {
  static transporter: Transporter;
  static templatesPath: string;

  private static async bootstrap() {
    const account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    this.templatesPath = path.resolve(__dirname, '..', 'views', 'emails');
  }

  static async send(
    subject: string,
    receiver: string,
    viewTemplateName: string,
    templateInputObject: object,
  ) {
    if (!(this.transporter && this.templatesPath)) {
      await this.bootstrap();
    }

    const templateFileContent = fs
      .readFileSync(path.resolve(this.templatesPath, viewTemplateName + '.hbs'))
      .toString('utf8');

    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(templateInputObject);

    const info = await this.transporter.sendMail({
      from: '"No Replay ✔" <noreplay@nps.com>',
      to: receiver,
      subject: subject,
      html: html,
    });

    console.log(nodemailer.getTestMessageUrl(info));

    return info;
  }
}

export { SendMailService };
