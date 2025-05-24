import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import awsConfig from '../../config/aws.config';
import emailConfig from '../../config/email.config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { NodemailerService, SesService, TemplateService } from './services';

@Module({
  imports: [
    ConfigModule.forFeature(awsConfig),
    ConfigModule.forFeature(emailConfig),
  ],
  controllers: [MailController],
  providers: [
    MailService,
    TemplateService,
    {
      provide: 'MAIL_PROVIDER',
      useFactory: (configService: ConfigService) => {
        const provider = configService.get<string>('MAIL_PROVIDER') || 'local';

        switch (provider.toLowerCase()) {
          case 'ses':
            return new SesService(configService);
          default: // Or 'local'
            return new NodemailerService(configService);
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailService],
})
export class MailModule {}
