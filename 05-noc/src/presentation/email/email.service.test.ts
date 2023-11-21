import nodemailer from 'nodemailer';
import { envs } from "../../config/plugins/envs.plugin";
import { EmailService, SendMailOptions } from "./email.service";

describe('email.service.ts', () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })
  const emailService = new EmailService();
  
  it('should send email', async () => {
    const options: SendMailOptions = {
      to: envs.MAILER_EMAIL,
      subject: 'Test',
      htmlBody: `<h1>Test</h1>`
    }

    await emailService.sendEmail(options)
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [],
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "yeisondavidgonzalezloaiza@gmail.com"
    })
  })

  test('should send email with attachments', async () => {
    await emailService.sendEmailWithFileSystemLogs(envs.MAILER_EMAIL);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: envs.MAILER_EMAIL,
      subject: "Logs server",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-low.log', path: './logs/logs-low.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
      ]),
    })
  })
});
