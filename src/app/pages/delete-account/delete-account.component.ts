import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { EmailRequest } from '../../interfaces/email-request';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css'],
    standalone: false
})
export class DeleteAccountComponent {
  constructor(private emailService: EmailService) {}

  formData = {
    telephone: '',
    email: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  isFormValid(): boolean {
    return (
      this.formData.telephone.trim() !== '' &&
      this.formData.email.trim() !== ''
    );
  }

  requestAccountDeletion() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Per favore, compila tutti i campi.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const emailData: EmailRequest = {
      sender: {
        name: 'Account Deletion Request',
        email: this.formData.email
      },
      to: [
        {
          //Ricorda di sostituire con stop@unika.email
          email: 'panico.alessandro1995@gmail.com',
          name: 'Richiesta Eliminazione Account'
        }
      ],
      subject: 'Richiesta di eliminazione account',
      htmlContent: `<html><body>
                      <p><b>Telefono:</b> ${this.formData.telephone}</p>
                      <p><b>Email:</b> ${this.formData.email}</p>
                      <p>Richiedo la cancellazione del mio account.</p>
                    </body></html>`,
      htmlText: `Telefono: ${this.formData.telephone}\nEmail: ${this.formData.email}\nRichiedo la cancellazione del mio account.`
    };

    this.emailService.sendEmail(emailData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'La richiesta di cancellazione è stata inviata con successo.';
        this.formData = { telephone: '', email: '' };
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Errore durante l’invio. Riprova più tardi.';
        console.error('Errore invio email:', error);
      }
    });
  }
}
