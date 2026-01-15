import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  /* Signal Inputs (Available in Angular 17.1+) */
  columns = input<TableColumn[]>([]);
  // data = input<Record<string, any>[]>([]);
  readonly data = input<any[]>([]);
  pageSize = input(5);
  showActions = input(true);

  /* Outputs */
  @Output() edit = new EventEmitter<Record<string, any>>();
  @Output() delete = new EventEmitter<Record<string, any>>();
  @Output() view = new EventEmitter<Record<string, any>>();

  /* State */
  currentPage = signal(1);
  sortKey = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  /* Computed Logic */
  sortedData = computed(() => {
    const rawData = this.data();
    if (!this.sortKey()) return rawData;

    return [...rawData].sort((a, b) => {
      const key = this.sortKey()!;
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return this.sortDirection() === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection() === 'asc' ? 1 : -1;
      return 0;
    });
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.data().length / this.pageSize()))
  );

  pageNumbers = computed(() => 
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  showingCount = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.data().length)
  );

  /* Methods */
  sort(column: TableColumn) {
    if (!column.sortable) return;
    if (this.sortKey() === column.key) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(column.key);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  /* Methods */
prevPage() {
  if (this.currentPage() > 1) {
    this.currentPage.update(p => p - 1);
  }
}

nextPage() {
  if (this.currentPage() < this.totalPages()) {
    this.currentPage.update(p => p + 1);
  }
}
}