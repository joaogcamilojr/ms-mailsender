import { Injectable } from '@nestjs/common';
import { PASSWORD_RESET_TEMPLATE } from '../templates/password-reset.template';

@Injectable()
export class TemplateService {
  processTemplate(template: string, data: Record<string, string>): string {
    let processedTemplate = template;

    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      processedTemplate = processedTemplate.replace(placeholder, value);
    });

    return processedTemplate;
  }

  getPasswordResetTemplate(name: string, reset_link: string): string {
    return this.processTemplate(PASSWORD_RESET_TEMPLATE, {
      name,
      reset_link,
    });
  }

  htmlToText(html: string): string {
    return html
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
