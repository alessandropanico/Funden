import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromptsService } from '../../../../services/prompts.service';

export interface PeriodicElement {
  name: string;
  nro: number;
}

export class Promtp {
  promtpTEXT: string = '';
  id?: number;
  walletID?: number;
  userID?: number;
  promtpSTATUS?: string;
  createdAt?: any;
  updatedAt?: any;
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

export interface PaginationInstance {
  /**
   * An optional ID for the pagination instance. Only useful if you wish to
   * have more than once instance at a time in a given component.
   */
  id?: string;
  /**
   * The number of items per paginated page.
   */
  itemsPerPage: number;
  /**
   * The current (active) page.
   */
  currentPage: number;
  /**
   * The total number of items in the collection. Only useful when
   * doing server-side paging, where the collection size is limited
   * to a single page returned by the server API.
   *
   * For in-memory paging, this property should not be set, as it
   * will be automatically set to the value of  collection.length.
   */
  totalItems?: number;
}


@Component({
    selector: 'app-quotas',
    templateUrl: './quotas.component.html',
    styleUrl: './quotas.component.scss',
    standalone: false
})
export class QuotasComponent implements OnInit {
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

  constructor(private promptsService: PromptsService) {}

  ngOnInit(): void {
    this.listPromptsUser();
    this.availablePromptsUser();
  }

  listPromptsUser() {
    this.promptsService.listPromptsUser().subscribe((response) => {
      // console.log('response************', response);
      this.dataPrompts = response.data;
      this.dataSourcePrompts = this.dataPrompts.slice(
        0,
        this.configPrompts.itemsPerPage
      );
    });
  }

  availablePromptsUser() {
    this.promptsService.availablePromptsUser().subscribe((response) => {
      this.availablePrompts = response.data;
    });
  }

  onPageChangePrompts(event: any) {
    this.dataSourcePrompts = this.dataPrompts.slice(
      event * this.configPrompts.itemsPerPage - this.configPrompts.itemsPerPage,
      event * this.configPrompts.itemsPerPage
    );
  }

  public setActivateOffers() {
    this.activateOffers = !this.activateOffers;
    this.propagar.emit(this.activateOffers);
  }
}
