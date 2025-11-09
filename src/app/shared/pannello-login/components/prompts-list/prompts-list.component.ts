import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { PromtpsResponse } from '../../../../models/prompt/response/promtpsResponse.model';
import { PromptsService } from '../../../../services/prompts.service';
import { Promtp } from '../../../../models/prompt/promtp.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

export interface PeriodicElement {
  name: string;
  nro: number;
}

const ELEMENT_DATA: Promtp[] = [
  {
    id: 1,
    promtpTEXT: 'PIPO',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:06:57.000Z',
    updatedAt: '2022-05-09T19:06:57.000Z',
  },
  {
    id: 2,
    promtpTEXT: 'POLAS',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:08.000Z',
    updatedAt: '2022-05-09T19:07:08.000Z',
  },
  {
    id: 3,
    promtpTEXT: 'LUAN',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:11.000Z',
    updatedAt: '2022-05-09T19:07:11.000Z',
  },
  {
    id: 1,
    promtpTEXT: 'PIPO',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:06:57.000Z',
    updatedAt: '2022-05-09T19:06:57.000Z',
  },
  {
    id: 2,
    promtpTEXT: 'POLAS',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:08.000Z',
    updatedAt: '2022-05-09T19:07:08.000Z',
  },
  {
    id: 3,
    promtpTEXT: 'LUAN',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:11.000Z',
    updatedAt: '2022-05-09T19:07:11.000Z',
  },
  {
    id: 1,
    promtpTEXT: 'PIPO',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:06:57.000Z',
    updatedAt: '2022-05-09T19:06:57.000Z',
  },
  {
    id: 2,
    promtpTEXT: 'POLAS',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:08.000Z',
    updatedAt: '2022-05-09T19:07:08.000Z',
  },
  {
    id: 3,
    promtpTEXT: 'LUAN',
    walletID: 1,
    userID: 712,
    promtpSTATUS: 'WITHOUTUSING',
    createdAt: '2022-05-09T19:07:11.000Z',
    updatedAt: '2022-05-09T19:07:11.000Z',
  },
];

@Component({
    selector: 'app-prompts-list',
    templateUrl: './prompts-list.component.html',
    styleUrls: ['./prompts-list.component.scss'],
    imports: [CommonModule, MatTableModule, NgxPaginationModule]
})
export class PromptsListComponent implements OnInit {
  @Input() activateOffers = false;

  @Output() propagar = new EventEmitter<boolean>();

  displayedColumnsPrompts: string[] = ['nro', 'name', 'offers'];
  dataSourcePrompts: Promtp[] = [];
  dataPrompts: Promtp[] = [];
  maxSize: number = 7;
  directionLinks: boolean = true;
  autoHide: boolean = false;
  responsive: boolean = false;
  configPrompts: PaginationInstance = {
    id: 'Prompts',
    itemsPerPage: 4,
    currentPage: 1,
  };
  labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  availablePrompts: any;

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  constructor(private promptsService: PromptsService) {}

  ngOnInit(): void {
     // this.dataPrompts = ELEMENT_DATA;
    // console.log("Dati caricati:", this.dataPrompts); // 🔍 Debug
    // this.totalPages = Math.ceil(this.dataPrompts.length / this.itemsPerPage); // Calcola il numero totale di pagine
    // this.updateDataSource();
    console.log("Carico green quota...")

  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDataSource();
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDataSource();
    }
  }

  setActivateOffers() {
    this.activateOffers = !this.activateOffers;
    this.propagar.emit(this.activateOffers);
  }

  updateDataSource() {
    // Calcola l'intervallo degli oggetti da visualizzare in base alla pagina e agli elementi per pagina
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Aggiorna il dataSource con gli oggetti della pagina corrente
    this.dataSourcePrompts = this.dataPrompts.slice(startIndex, endIndex);
  }

onPageChangePrompts(event: number) {
  // Aggiorna la pagina corrente
  this.configPrompts.currentPage = event;

  // Aggiorna la vista della tabella in base alla pagina selezionata
  this.updateDataSource();
}

listPromptsUser() {
  this.promptsService.listPromptsUser().subscribe((response) => {
    this.dataPrompts = response.data;
    console.log("Dati ricevuti:", this.dataPrompts); // 🔍 Aggiungi un log per vedere se i dati sono corretti
    this.onPageChangePrompts(1); // Chiama onPageChange per caricare i dati della prima pagina
  });
}


  availablePromptsUser() {
    this.promptsService.availablePromptsUser().subscribe((response) => {
      this.availablePrompts = response.data;
    });
  }

  //  onPageChangePrompts(event: any) {
  //    this.dataSourcePrompts = this.dataPrompts.slice(
  //      event * this.configPrompts.itemsPerPage - this.configPrompts.itemsPerPage,
  //      event * this.configPrompts.itemsPerPage
  //    );
  //  }

}
