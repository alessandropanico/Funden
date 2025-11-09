export interface EmailRequest {
  sender: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  subject: string;
  htmlContent: string;
  htmlText: string;
}
