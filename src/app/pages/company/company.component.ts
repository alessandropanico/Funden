import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {


  ngOnInit(): void {
    this.updatePagination()
  }

  currentPage: number = 0;
  itemsPerPage: number = 15;
  totalPages: number = 0;
  visiblePages: number[] = [];


  companies = [

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },

    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },
    { image: '/assets/immaginiCompany/passaparola2.png', monthly: '14%', quotas: '0,14€', earning: '2215', performance: '+2,15%', name: 'PASSAPAROLA ', date: '12/02/2025', emissions: '285', rating: 'BUY' },


  ];

  get paginatedCompanies() {
    const start = this.currentPage * this.itemsPerPage;
    return this.companies.slice(start, start + this.itemsPerPage);
  }


  updatePagination() {
    this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);

    // Calcola il range di pagine visibili (5 alla volta)
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(start + 5, this.totalPages);

    this.visiblePages = Array.from({ length: end - start }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  //-----------------------------------------------------

  years = [2023, 2024, 2025];
  months = [
    { value: '01', label: 'Gennaio' },
    { value: '02', label: 'Febbraio' },
    { value: '03', label: 'Marzo' },
    // ... altri mesi
  ];

  selectedYear: string = '';
  selectedMonth: string = '';
  orderBy: string = 'default';
  formValid: boolean = false;

  checkForm() {
    this.formValid = !!this.selectedYear && !!this.selectedMonth;
  }


}
