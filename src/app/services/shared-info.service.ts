import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SharedInfoService {
  private isLoading: BehaviorSubject<boolean>;
  private language: BehaviorSubject<string | null>;
  private isLoged: BehaviorSubject<boolean | null>;
  private menu: BehaviorSubject<any>;  // Tipo generico se non hai ancora definito un tipo per il menu
  private showlogin: BehaviorSubject<boolean | null>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.language = new BehaviorSubject<string | null>(null);
    this.isLoged = new BehaviorSubject<boolean | null>(null);
    this.menu = new BehaviorSubject<any>(null);  // Puoi sostituire `any` con un tipo più specifico se lo conosci
    this.showlogin = new BehaviorSubject<boolean | null>(null);
  }

  showloginWatch(): Observable<boolean | null> {
    return this.showlogin.asObservable();
  }

  showloginSet(value: boolean | null): void {
    this.showlogin.next(value);
  }

  menuWatch(): Observable<any> {
    return this.menu.asObservable();
  }

  menuSet(value: any): void {  // Sostituisci `any` con il tipo corretto per il menu, se possibile
    this.menu.next(value);
  }

  isLoadingWatch(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  isLoadingSet(value: boolean): void {
    this.isLoading.next(value);
  }

  languageWatch(): Observable<string | null> {
    return this.language.asObservable();
  }

  languageSet(value: string | null): void {
    this.language.next(value);
  }

  isLogedWatch(): Observable<boolean | null> {
    return this.isLoged.asObservable();
  }

  isLogedSet(value: boolean | null): void {
    this.isLoged.next(value);
  }
}
