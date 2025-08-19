var nodemailer = require('nodemailer');

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private transporter: nodemailer.Transport;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: options.from || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${options.to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendJobApplicationNotification(
    applicantName: string,
    jobTitle: string,
    applicantEmail: string,
    phone?: string,
    coverLetter?: string,
    resumeUrl?: string
  ): Promise<void> {
    const subject = `New Job Application - ${applicantName} for ${jobTitle}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4bc2e2; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #020381; }
            .value { margin-top: 5px; }
            .cover-letter { background: white; padding: 15px; border-left: 4px solid #4bc2e2; margin: 15px 0; }
            .button { display: inline-block; background: #4bc2e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Job Application Received</h1>
              <p>Express Plumbing Career Portal</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Position Applied For:</div>
                <div class="value">${jobTitle}</div>
              </div>
              
              <div class="field">
                <div class="label">Applicant Name:</div>
                <div class="value">${applicantName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value">${applicantEmail}</div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              ${coverLetter ? `
              <div class="field">
                <div class="label">Cover Letter:</div>
                <div class="cover-letter">${coverLetter.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              ${resumeUrl ? `
              <div class="field">
                <div class="label">Resume:</div>
                <div class="value">
                  <a href="${resumeUrl}" class="button">Download Resume</a>
                </div>
              </div>
              ` : ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p><strong>Next Steps:</strong></p>
                <p>Please log in to the admin dashboard to review this application and update its status.</p>
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard" class="button">
                  View Admin Dashboard
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@expressplumbing.com',
      subject,
      html,
    });
  }
}

// Create a singleton instance
const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

export const emailService = new EmailService(emailConfig);

