export interface PaymentMethResponse {
  ok: boolean;
  message: string;
  data: PaymentMethod;
}

interface PaymentMethod {
  id: string;
  object: string;
  billing_details: Billingdetails;
  card: Card;
  created: number;
  customer?: any;
  livemode: boolean;
  metadata: Metadata;
  type: string;
}

interface Metadata {
}

interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from?: any;
  last4: string;
  networks: Networks;
  three_d_secure_usage: Threedsecureusage;
  wallet?: any;
}

interface Threedsecureusage {
  supported: boolean;
}

interface Networks {
  available: string[];
  preferred?: any;
}

interface Checks {
  address_line1_check?: any;
  address_postal_code_check?: any;
  cvc_check: string;
}

interface Billingdetails {
  address: Address;
  email?: any;
  name?: any;
  phone?: any;
}

interface Address {
  city?: any;
  country?: any;
  line1?: any;
  line2?: any;
  postal_code?: any;
  state?: any;
}