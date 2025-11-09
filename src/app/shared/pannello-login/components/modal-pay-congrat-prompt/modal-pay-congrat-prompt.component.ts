import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-pay-congrat-prompt',
    templateUrl: './modal-pay-congrat-prompt.component.html',
    styleUrls: ['./modal-pay-congrat-prompt.component.scss'],
    imports: [CommonModule]
})
export class ModalPayCongratPromptComponent implements OnInit {

  @Input () modal: any;
  @Input () prompt = '';
  @Input () plan = 0;
  @Output () emitPrompt: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private ngbModal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  closeModal(modal: any) {
    this.ngbModal.dismissAll(modal)
    this.emitPrompt.emit('')
  }



}
