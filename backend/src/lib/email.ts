/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as postmark from 'postmark';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { UserDocument } from '../models/User';
import formatMoney from './formatMoney';
import splitIntoChuck from './batchArray';

dayjs.locale('es');

interface BrowserDetectInfo {
  name?: string;
  version?: string;
  versionNumber?: number;
  mobile?: boolean;
  os?: string;
}

const fromEmail = process.env.SENDER_EMAIL;

// const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export async function sendWelcomeEmail(user: UserDocument) {
  const emailOptions = {
    From: `Plataforma Unidos <${fromEmail}>`,
    To: `${user?.email}`,
    TemplateAlias: 'welcome',
    TemplateModel: {
      product_url: process.env.CLIENT_URL,
      name: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`,
      action_url: `${process.env.CLIENT_URL}/sign-in`,
      product_name: 'Plataforma Unidos',
      company_name: 'C.A. Cigarrera Bigott Sucs.',
      company_address: `Apartado 186, Caracas, 1010-A, Venezuela, Rif: J-00006748-1`,
      login_url: `${process.env.CLIENT_URL}/sign-in`,
      username: 'username_Value',
      trial_length: 'trial_length_Value',
      trial_start_date: 'trial_start_date_Value',
      trial_end_date: 'trial_end_date_Value',
      support_email: 'soporte@plataformaunidos.com.ve',
      live_chat_url: 'live_chat_url_Value',
      sender_name: 'sender_name_Value',
      help_url: `${process.env.CLIENT_URL}/contact`,
    },
  };
  // return client.sendEmailWithTemplate(emailOptions);
}

interface ResetPasswordOptions {
  user: UserDocument;
  os: BrowserDetectInfo;
  url: string;
}

export async function sendResetPasswordEmail({
  user,
  os,
  url,
}: ResetPasswordOptions) {
  console.log(url);
  const emailOptions = {
    From: `Plataforma Unidos <${fromEmail}>`,
    To: `${user?.email}`,
    TemplateAlias: 'password-reset',
    TemplateModel: {
      name: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`,
      action_url: url,
      support_url: `${process.env.CLIENT_URL}/contact`,
      product_name: 'Plataforma Unidos',
      company_name: 'C.A. Cigarrera Bigott Sucs.',
      company_address: `Apartado 186, Caracas, 1010-A, Venezuela, Rif: J-00006748-1`,
      product_url: `${process.env.CLIENT_URL}/contact`,
      operating_system: os?.os,
      browser_name: `${os?.name ?? ''} ${os?.version ?? ''}`,
    },
  };
  // return client.sendEmailWithTemplate(emailOptions);
}
