import Fuse from 'fuse.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    TableController,
} from '@tanstack/lit-table';

@customElement('table-wrapper')
export class TableWrapper extends LitElement {
    @property({ type: Array }) data: unknown[] = [];

    @state() private _tableController = new TableController<unknown>(this);
    @state() private _table: ReturnType<TableController<unknown>['table']> | null = null;
    @state() private _sorting: SortingState = [];
    @state() private _pagination: PaginationState = {
        pageIndex: 0,
        pageSize: 10,
    };
    @state() private _filtered: unknown[] = [];
    @state() private _query: string = '';
    @state() private _fuse: Fuse<unknown> | null = null;

    private _keys: string[] = [];

    private setKeys(data: unknown[]) {
        if (this.data.length > 0 && this._keys.length === 0) {
            this._keys = [
                ...new Set(
                    data.flatMap((item) =>
                        typeof item === 'object' && item !== null ? Object.keys(item) : [],
                    ),
                ),
            ];
        }
    }

    private setupTable() {
        if (!Array.isArray(this._filtered) || this._filtered.length === 0) return;

        this.setKeys(this.data);

        const columns = this._keys.map((key) => ({
            header: key,
            accessorKey: key,
            enableSorting: true,
        }));

        this._table = this._tableController.table({
            data: this._filtered,
            columns,
            state: {
                sorting: this._sorting,
                pagination: this._pagination,
            },
            onSortingChange: (updater) => {
                const newSorting = typeof updater === 'function' ? updater(this._sorting) : updater;

                this._sorting = newSorting;
                this._table?.setOptions((prev) => ({
                    ...prev,
                    state: { ...prev.state, sorting: newSorting },
                }));
            },
            onPaginationChange: (updater) => {
                const newPagination =
                    typeof updater === 'function' ? updater(this._pagination) : updater;

                this._pagination = newPagination;
                this._table?.setOptions((prev) => ({
                    ...prev,
                    state: { ...prev.state, pagination: newPagination },
                }));
            },
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
        });
    }

    private initFuse() {
        this.setKeys(this.data);
        this._fuse = new Fuse(this.data, {
            includeScore: true,
            findAllMatches: true,
            threshold: 0.0,
            keys: this._keys,
        });
    }

    protected firstUpdated(): void {
        this._filtered = this.data;
        this.setupTable();
        this.initFuse();
    }

    private toggleSort(columnId: string) {
        const existing = this._sorting.find((s) => s.id === columnId);
        let newSorting: SortingState = [];

        if (!existing) {
            newSorting = [{ id: columnId, desc: false }];
        } else if (!existing.desc) {
            newSorting = [{ id: columnId, desc: true }];
        } else {
            newSorting = [];
        }

        this._sorting = newSorting;
        this._table?.setSorting(newSorting);
    }

    private handleSearchInput(event: Event) {
        const input = event.target as HTMLInputElement;

        this._query = input.value;
        this.filterTable(this._query);
        this.setupTable();
    }

    private filterTable(query: string) {
        if (!query.trim()) {
            this._filtered = [...this.data];

            return;
        }

        const res = this._fuse?.search(query);
        const items = res?.map((e) => e.item);

        if (items) this._filtered = items;
    }

    render() {
        if (!this._table) return html`<p>Loading table...</p>`;

        const headerGroups = this._table.getHeaderGroups();
        const rows = this._table.getRowModel().rows;

        console.log(headerGroups[0].headers.length);

        return html`
            <div class="table-wrapper">
                <div class="table-header">
                    <div class="header-field">
                        <label for="table-filter">Zoek in de tabel:</label>
                        <input
                            id="table-filter"
                            type="text"
                            placeholder="Zoekterm"
                            .value=${this._query}
                            @input=${this.handleSearchInput}
                        />
                    </div>
                </div>
                <table>
                    <thead>
                        ${headerGroups.map(
                            (headerGroup) => html`
                                <tr>
                                    ${headerGroup.headers.map(
                                        (header, index) => html`
                                            <th
                                                aria-sort="${header.column.getIsSorted()
                                                    ? header.column.getIsSorted() === 'asc'
                                                        ? 'ascending'
                                                        : 'descending'
                                                    : 'none'}"
                                            >
                                                <button
                                                    data-column-index=${index}
                                                    @click=${() =>
                                                        this.toggleSort(header.column.id)}
                                                >
                                                    ${flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    <span
                                                        class="sorter-icon ${header.column.getIsSorted() ||
                                                        ''}"
                                                    ></span>
                                                </button>
                                            </th>
                                        `,
                                    )}
                                </tr>
                            `,
                        )}
                    </thead>
                    <tbody>
                        ${!this._filtered.length
                            ? html`<tr>
                                  <td
                                      class="no-results"
                                      colspan="${headerGroups[0].headers.length}"
                                  >
                                      Geen resultaten gevonden
                                  </td>
                              </tr>`
                            : html`${rows.map(
                                  (row) => html`
                                      <tr>
                                          ${row
                                              .getVisibleCells()
                                              .map(
                                                  (cell) => html`
                                                      <td>
                                                          ${flexRender(
                                                              cell.column.columnDef.cell,
                                                              cell.getContext(),
                                                          )}
                                                      </td>
                                                  `,
                                              )}
                                      </tr>
                                  `,
                              )}`}
                    </tbody>
                </table>
                <div class="table-footer">
                    <nav aria-label="pagination">
                        <span class="page-indicator">
                            Page ${this._table.getState().pagination.pageIndex + 1} of
                            ${this._table.getPageCount()}
                        </span>
                        <button
                            @click=${() => this._table?.setPageIndex(0)}
                            ?disabled=${!this._table?.getCanPreviousPage()}
                            aria-label="First"
                        >
                            Eerste
                        </button>
                        <button
                            @click=${() => this._table?.previousPage()}
                            ?disabled=${!this._table?.getCanPreviousPage()}
                            aria-label="Previous"
                        >
                            Vorige
                        </button>
                        ${[...Array(this._table.getPageCount()).keys()].map(
                            (page) => html`
                                <button
                                    class=${this._pagination.pageIndex === page
                                        ? 'active-page'
                                        : ''}
                                    @click=${() => this._table?.setPageIndex(page)}
                                >
                                    ${page + 1}
                                </button>
                            `,
                        )}
                        <button
                            @click=${() => this._table?.nextPage()}
                            ?disabled=${!this._table?.getCanNextPage()}
                            aria-label="Next"
                        >
                            Volgende
                        </button>
                        <button
                            @click=${() =>
                                this._table?.setPageIndex(this._table.getPageCount() - 1)}
                            ?disabled=${!this._table?.getCanNextPage()}
                            aria-label="Latest"
                        >
                            Laatste
                        </button>
                    </nav>
                </div>
            </div>
        `;
    }

    static styles = css`
        .table-wrapper {
            padding: 1rem;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            font-size: 1rem;
            width: 100%;
        }

        thead th {
            position: relative;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            user-select: none;
        }

        button {
            cursor: pointer;
            position: relative;
            border: none;
            background: none;
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
            font-size: 1rem;
        }

        thead th button {
            height: 100%;
            text-align: right;
            padding: 0.625rem 0;
            padding-right: 1.5rem;
            width: 100%;
        }

        thead th span.sorter-icon {
            font-size: 0.5rem;
            position: absolute;
            right: 5px;
            display: flex;
            flex-direction: column;
            top: 0;
            opacity: 0.125;
            justify-content: center;
            bottom: 0;
            margin: auto;

            &:before {
                content: '▲';
            }

            &:after {
                content: '▼';
            }
        }

        thead th span.sorter-icon.desc,
        thead th span.sorter-icon.asc {
            opacity: 1;
        }

        thead th span.sorter-icon.desc {
            &:before {
                opacity: 0;
            }
        }

        thead th span.sorter-icon.asc {
            &:after {
                opacity: 0;
            }
        }

        table td {
            padding: 0.75rem 0.625rem;
            border-color: #fff;
            border: 2px solid #fff;
        }

        tbody tr:first-child * {
            border-top: none;
        }

        tbody tr:nth-of-type(odd) {
            background-color: #f2f2f2;
        }

        td.no-results {
            text-align: center;
        }

        .table-header {
            display: flex;
            align-items: center;
            gap: 2rem;

            .header-field {
                display: inline-flex;
                align-items: center;
                gap: 1rem;
            }
        }

        .table-footer {
            border-top: 2px solid;
        }

        input {
            padding: 0 0.5rem;
            min-height: 2.25rem;
            border: 1px solid black;
            font-size: 1rem;
            font-weight: normal;
            border-radius: 0;
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
            min-width: 15rem;

            &:focus-visible {
                outline: solid 1px black;
                outline-offset: 0;
            }
        }
    `;
}
