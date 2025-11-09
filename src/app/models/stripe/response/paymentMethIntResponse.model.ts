export interface PaymentMethIntResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: Amountdetails;
  amount_received: number;
  application?: any;
  application_fee_amount?: any;
  automatic_payment_methods?: any;
  canceled_at?: any;
  cancellation_reason?: any;
  capture_method: string;
  charges: Charges;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer?: any;
  description?: any;
  invoice?: any;
  last_payment_error?: any;
  livemode: boolean;
  metadata: Tip;
  next_action?: any;
  on_behalf_of?: any;
  payment_method: string;
  payment_method_options: Paymentmethodoptions;
  payment_method_types: string[];
  processing?: any;
  receipt_email?: any;
  review?: any;
  setup_future_usage?: any;
  shipping?: any;
  source?: any;
  statement_descriptor?: any;
  statement_descriptor_suffix?: any;
  status: string;
  transfer_data?: any;
  transfer_group?: any;
}

interface Paymentmethodoptions {
  card: Card;
}

interface Card {
  installments?: any;
  mandate_options?: any;
  network?: any;
  request_three_d_secure: string;
}

interface Charges {
  object: string;
  data: any[];
  has_more: boolean;
  total_count: number;
  url: string;
}

interface Amountdetails {
  tip: Tip;
}

interface Tip {
}