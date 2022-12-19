/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as postmark from 'postmark';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface BrowserDetectInfo {
  name?: string;
  version?: string;
  versionNumber?: number;
  mobile?: boolean;
  os?: string;
}

// const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

const fromEmail = 'notificacions@avilatek.com';
const adminUrl = process.env.DASHBOARD_URL;
const clientUrl = process.env.CLIENT_URL;
const companyName = 'Caledonia';
const companyAddress = 'Caracas, Venezuela';

export async function sendWelcomeEmail(user: any) {
  const emailOptions = {
    From: `Notificaciones <${fromEmail}>`,
    To: `${user?.email}`,
    TemplateAlias: 'welcome',
    TemplateModel: {},
  };
  // return client.sendEmailWithTemplate(emailOptions);
}

interface ResetPasswordOptions {
  user: any;
  os: BrowserDetectInfo;
  url: string;
}

export async function sendResetPasswordEmail({
  user,
  os,
  url,
}: ResetPasswordOptions) {
  try {
    const emailOptions = {
      From: `Notificaciones <${fromEmail}>`,
      To: `${user?.email}`,
      TemplateAlias: 'password-reset',
      TemplateModel: {
        product_url: adminUrl,
        product_name: companyName,
        name: user?.firstName ?? '',
        action_url: url,
        operating_system: os.os ?? 'N/A',
        browser_name: `${os?.name ?? 'N/A'} ${os?.version ?? '-'}`,
        support_url: `${adminUrl}/frequently-asked-questions`, // definir
        company_name: companyName,
        company_address: companyAddress,
      },
    };
    // return client.sendEmailWithTemplate(emailOptions);
  } catch (error) {
    console.log(error);
  }
}
