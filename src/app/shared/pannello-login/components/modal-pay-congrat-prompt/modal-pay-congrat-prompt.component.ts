import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-pay-congrat-prompt',
  templateUrl: './modal-pay-congrat-prompt.component.html',
  styleUrls: ['./modal-pay-congrat-prompt.component.scss'],
  imports: [CommonModule]
})
export class ModalPayCongratPromptComponent implements OnInit {

  @Input() prompt = '';
  @Input() plan = 0;
  @Output() emitPrompt: EventEmitter<string> = new EventEmitter<string>();

  constructor(public modalRef?: BsModalRef) { }

  ngOnInit(): void {}

  closeModal() {
    this.modalRef?.hide();  // chiude il modal
    this.emitPrompt.emit('');
  }
}
