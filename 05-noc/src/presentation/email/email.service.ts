import { createTransport } from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Logs server'
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      <p>Fugiat ut eiusmod et velit tempor commodo est eiusmod ea esse voluptate ut cillum nulla. Aute aliquip deserunt fugiat mollit incididunt velit anim eiusmod reprehenderit cupidatat exercitation. Culpa officia aute incididunt ipsum elit fugiat.</p>
      <p>Ver logs adjuntos</p>
    `

    const attachments: Attachments[] = [
      { filename: 'logs-low.log', path: './logs/logs-low.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments
    })
  }
}
