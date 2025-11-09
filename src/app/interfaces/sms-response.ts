
interface SmsResponse {
  entity: {
    id: string;  // Questo è l'ID che ti serve come 'idResponse'
    // Aggiungi altre proprietà se necessario
  };
  success: boolean;
  message: string;
  idResponse?: string; // Questa è la nostra proprietà che conterrà l'ID da usare
}