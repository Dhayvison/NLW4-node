import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { error } from '../utils/text-coloring';

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

  static async send(subject: string, receiver: string, body: string) {
    if (!(this.transporter && this.templatesPath)) {
      await this.bootstrap();
    }

    const templateFileContent = fs
      .readFileSync(path.resolve(this.templatesPath, 'NPSMail.hbs'))
      .toString('utf8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse({
      name: receiver,
      title: subject,
      description: body,
    });

    const info = await this.transporter.sendMail({
      from: '"No Replay ✔" <noreplay@nps.com>',
      to: receiver,
      subject: subject,
      text: body,
      html: html,
    });

    console.log(nodemailer.getTestMessageUrl(info));

    return info;
  }
}

export { SendMailService };
