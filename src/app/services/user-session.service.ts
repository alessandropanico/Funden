import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private storageKey = 'userData';
  private tokenKey = 'tokenLogin'; // Chiave per il token

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Salva i dati utente nel localStorage
  setUserData(userData: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(userData));
    }
  }

  // Recupera i dati utente dal localStorage
  getUserData(): any {
    if (!this.isBrowser()) {
      return null;
    }
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Rimuove i dati utente dal localStorage
  clearUserData(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Salva il token nel localStorage
  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Recupera il token dal localStorage
  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  // Rimuove il token dal localStorage
  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Funzione per verificare se il token è scaduto
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decodifica la parte payload del JWT
      const expirationDate = decodedToken.exp * 1000;  // La data di scadenza è in secondi, moltiplichiamo per 1000 per avere i millisecondi
      return expirationDate < Date.now();  // Confronta con la data attuale
    } catch (e) {
      console.error('Errore nel decodificare il token', e);
      return true;  // Se c'è un errore nel decodificare il token, lo consideriamo scaduto
    }
  }

}
