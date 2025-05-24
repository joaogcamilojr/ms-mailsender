import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  fromEmail: process.env.AWS_SES_FROM_EMAIL,
  fromName: process.env.AWS_SES_FROM_NAME,
}));
