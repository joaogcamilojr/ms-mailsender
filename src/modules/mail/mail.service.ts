import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PasswordResetEmailData } from './interfaces/email.interface';
import { TemplateService } from './services';

interface IMailProvider {
  sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<void>;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject('MAIL_PROVIDER') private readonly mailProvider: IMailProvider,
    private readonly templateService: TemplateService,
    private readonly configService: ConfigService,
  ) {}

  async sendChangePasswordEmail({
    name,
    email,
    reset_link,
  }: PasswordResetEmailData): Promise<void> {
    try {
      this.logger.log(`Sending password reset email to: ${email}`);

      const htmlContent = this.templateService.getPasswordResetTemplate(
        name,
        reset_link,
      );
      const textContent = this.templateService.htmlToText(htmlContent);

      await this.mailProvider.sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: htmlContent,
        text: textContent,
      });

      this.logger.log(`Password reset email sent successfully to: ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${email}:`,
        error,
      );
      throw error;
    }
  }
}
