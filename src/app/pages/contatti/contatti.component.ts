import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { EmailRequest } from '../../interfaces/email-request';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent {
  constructor(private emailService: EmailService) {}

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  isFormValid(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.subject.trim() !== '' &&
      this.formData.message.trim() !== ''
    );
  }

  sendMessage() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const emailData: EmailRequest = {
      sender: {
        name: this.formData.name,
        email: this.formData.email
      },
      to: [
        {
          email: 'panico.alessandro1995@gmail.com',
          name: 'E-mail di prova!'
        }
      ],
      subject: this.formData.subject,
      htmlContent: `<html><body>
                      <p><b>Nome:</b> ${this.formData.name}</p>
                      <p><b>Email:</b> ${this.formData.email}</p>
                      <p><b>Telefono:</b> ${this.formData.phone}</p>
                      <p><b>Messaggio:</b> ${this.formData.message}</p>
                    </body></html>`,
      htmlText: `Nome: ${this.formData.name}\nEmail: ${this.formData.email}\nTelefono: ${this.formData.phone}\nMessaggio: ${this.formData.message}`
    };

    this.emailService.sendEmail(emailData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Messaggio inviato con successo!';
        this.formData = { name: '', email: '', phone: '', subject: '', message: '' };
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Errore durante l’invio. Riprova più tardi.';
        console.error('Errore invio email:', error);
      }
    });
  }
}
