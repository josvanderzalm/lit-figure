import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { ActionItem, ButtonActionItem, GroupActionItem } from '@/types';

// SCOPED ELEMENT, DO NOT ADD: @customElement('action-menu')
export class ActionMenu extends LitElement {
    static styles = css`
        .menu {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
            position: relative;
            z-index: 10;
        }

        .menu-group {
            position: relative;
        }

        .submenu {
            display: none;
            position: absolute;
            bottom: 100%;
            right: 0;
            flex-direction: column;
            background: white;
            border: 1px solid #ccc;
            z-index: 10;
            width: max-content;
        }

        .menu-group.open .submenu {
            display: flex;
        }

        .button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: #fff;
            border: 1px solid #ccc;
            cursor: pointer;
        }

        .button img {
            width: 16px;
            height: 16px;
        }

        .chevron {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid black;
            margin-left: 0.5rem;
            transition: transform 0.3s;
        }

        .menu-group.open .chevron {
            transform: rotate(180deg);
        }
    `;

    @property({ type: Array }) buttons: ActionItem[] = [];

    @state() private openGroupIndex: number | null = null;
    private closeTimer: number | null = null;

    private handleItemClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const groupIndex = target.dataset.groupIndex ? parseInt(target.dataset.groupIndex) : null;
        const itemIndex = parseInt(target.dataset.itemIndex!);

        if (groupIndex !== null) {
            const group = this.buttons[groupIndex] as GroupActionItem;
            const item = group.children[itemIndex] as ButtonActionItem;

            item.action?.();
            this.closeSubMenu();
        } else {
            const item = this.buttons[itemIndex] as ButtonActionItem;

            item.action?.();
            this.closeSubMenu();
        }
    };

    private handleGroupClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.groupIndex!);

        this.toggleSubMenu(index);
    };

    private toggleSubMenu(groupIndex: number) {
        this.openGroupIndex = this.openGroupIndex === groupIndex ? null : groupIndex;
    }

    private closeSubMenu() {
        this.openGroupIndex = null;
        if (this.closeTimer) clearTimeout(this.closeTimer);
    }

    private handleMouseOut = () => {
        if (this.closeTimer) clearTimeout(this.closeTimer);
        this.closeTimer = window.setTimeout(() => this.closeSubMenu(), 1500);
    };

    private cancelCloseTimer = () => {
        if (this.closeTimer) clearTimeout(this.closeTimer);
        this.closeTimer = null;
    };

    private handleKeyDown = (e: KeyboardEvent) => {
        const buttons = Array.from(this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.button'));
        const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);

        switch (e.key) {
            case 'ArrowRight': {
                const next = (currentIndex + 1) % buttons.length;

                buttons[next].focus();
                e.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                const prev = (currentIndex - 1 + buttons.length) % buttons.length;

                buttons[prev].focus();
                e.preventDefault();
                break;
            }
            case 'ArrowDown': {
                const current = document.activeElement as HTMLElement;
                const group = current.closest('.menu-group');
                const groupIndex = Array.from(
                    this.shadowRoot!.querySelectorAll('.menu-group'),
                ).indexOf(group!);

                if (group && groupIndex !== -1) {
                    this.openGroupIndex = groupIndex;
                    this.requestUpdate();

                    const submenu = group.querySelector('.submenu');
                    const submenuButtons = submenu?.querySelectorAll<HTMLButtonElement>('button');

                    submenuButtons?.[0]?.focus();
                    e.preventDefault();
                }
                break;
            }
            case 'ArrowUp': {
                const parent = (document.activeElement as HTMLElement).closest('.menu-group');
                const groupButton = parent?.querySelector<HTMLButtonElement>('button.button');

                groupButton?.focus();
                e.preventDefault();
                break;
            }
            case 'Escape': {
                const parent = (document.activeElement as HTMLElement).closest('.menu-group');
                const groupButton = parent?.querySelector<HTMLButtonElement>('button.button');

                groupButton?.focus();
                this.closeSubMenu();
                e.preventDefault();
                break;
            }
        }
    };

    render() {
        return html`
            <div class="menu" @keydown=${this.handleKeyDown} role="menubar">
                ${this.buttons.map((item, index) => {
                    if (item.type === 'button') {
                        const btn = item as ButtonActionItem;

                        return html`
                            <button
                                class="button"
                                role="menuitem"
                                aria-label=${btn.label}
                                data-item-index=${index}
                                tabindex="0"
                                @click=${this.handleItemClick}
                            >
                                ${btn.icon ? html`<img src="${btn.icon}" alt="" />` : ''}
                                ${btn.label}
                            </button>
                        `;
                    }

                    if (item.type === 'group') {
                        const group = item as GroupActionItem;
                        const isOpen = this.openGroupIndex === index;

                        return html`
                            <div
                                class="menu-group ${isOpen ? 'open' : ''}"
                                @mouseenter=${this.cancelCloseTimer}
                                @mouseleave=${this.handleMouseOut}
                            >
                                <button
                                    class="button"
                                    role="menuitem"
                                    aria-haspopup="true"
                                    aria-expanded=${isOpen}
                                    aria-label=${group.label}
                                    data-group-index=${index}
                                    tabindex="0"
                                    @click=${this.handleGroupClick}
                                >
                                    ${group.icon ? html`<img src="${group.icon}" alt="" />` : ''}
                                    ${group.label}
                                    <span class="chevron"></span>
                                </button>
                                <div
                                    class="submenu"
                                    role="menu"
                                    aria-label="Submenu of ${group.label}"
                                    @mouseenter=${this.cancelCloseTimer}
                                    @mouseleave=${this.handleMouseOut}
                                >
                                    ${group.children.map((child, childIndex) => {
                                        if (child.type === 'button') {
                                            const subBtn = child as ButtonActionItem;

                                            return html`
                                                <button
                                                    class="button"
                                                    role="menuitem"
                                                    aria-label=${subBtn.label}
                                                    data-group-index=${index}
                                                    data-item-index=${childIndex}
                                                    tabindex="0"
                                                    @click=${this.handleItemClick}
                                                >
                                                    ${subBtn.icon
                                                        ? html`<img src="${subBtn.icon}" alt="" />`
                                                        : ''}
                                                    ${subBtn.label}
                                                </button>
                                            `;
                                        }

                                        return null;
                                    })}
                                </div>
                            </div>
                        `;
                    }

                    return null;
                })}
            </div>
        `;
    }
}
