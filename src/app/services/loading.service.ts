import { Injectable, computed, signal } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  _loadingSignal = signal<boolean>(false);
  _loading = computed(() => this._loadingSignal());
  get loading(): boolean { return this._loading(); }
  set loading(value: boolean) { this._loadingSignal.set(value); }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }
  exito(message: string) {
    Swal.fire('Exito', message, 'success');
  }
  info(message: string) {
    Swal.fire('', message, 'info');
  }

}

