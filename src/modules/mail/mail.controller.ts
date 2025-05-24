import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PasswordResetEmailData } from './interfaces/email.interface';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @MessagePattern('request-reset-password')
  async handlePasswordReset(
    @Ctx() context: RmqContext,
    @Payload() data: PasswordResetEmailData,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(
        `Processing password reset request for: ${data.name} (${data.email})`,
      );

      await this.mailService.sendChangePasswordEmail(data);

      this.logger.log(
        `Successfully processed password reset request for: ${data.name} (${data.email})`,
      );
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(
        `Failed to process password reset request for  ${data.name} (${data.email}): ${JSON.stringify(error, null, 2)}`,
      );
      channel.nack(originalMsg);
    }
  }
}
