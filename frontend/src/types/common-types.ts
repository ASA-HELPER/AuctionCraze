export interface ITemplateParams{
  senderName: string;
  subject: string;
  email: string;
  message: string;
  phone: string;
  [key: string]: string | undefined;
};