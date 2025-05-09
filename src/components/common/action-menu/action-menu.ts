import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { ActionItem, ButtonActionItem, GroupActionItem } from '@/types';

@customElement('action-menu')
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

    private openGroupIndex: number | null = null;
    private closeTimer: number | null = null;

    private handleClick(action?: () => void, groupIndex?: number) {
        if (action) {
            action();
            this.closeSubMenu();
        }

        if (groupIndex !== undefined) {
            this.toggleSubMenu(groupIndex);
        }
    }

    private toggleSubMenu(groupIndex: number) {
        if (this.openGroupIndex !== null && this.openGroupIndex !== groupIndex) {
            this.closeSubMenu();
        }

        this.openGroupIndex = this.openGroupIndex === groupIndex ? null : groupIndex;
        this.requestUpdate();
    }

    private closeSubMenu() {
        this.openGroupIndex = null;
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
        this.requestUpdate();
    }

    private handleMouseOut() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
        this.closeTimer = window.setTimeout(() => this.closeSubMenu(), 1500);
    }

    private cancelCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        const buttons = Array.from(this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.button'));
        const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);

        if (e.key === 'ArrowRight') {
            console.log('Right arrow pressed');

            const next = (currentIndex + 1) % buttons.length;

            buttons[next].focus();
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            console.log('Left arrow pressed');

            const prev = (currentIndex - 1 + buttons.length) % buttons.length;

            buttons[prev].focus();
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            console.log('Down arrow pressed');

            const current = document.activeElement as HTMLButtonElement;
            const submenu = current?.parentElement?.querySelector('.submenu');
            const submenuButtons = submenu?.querySelectorAll<HTMLButtonElement>('button');

            if (submenuButtons && submenuButtons.length > 0) {
                submenuButtons[0].focus();
                e.preventDefault();
            }
        } else if (e.key === 'ArrowUp') {
            console.log('Up arrow pressed');

            const parent = (document.activeElement as HTMLElement).closest('.menu-group');
            const groupButton = parent?.querySelector<HTMLButtonElement>('button.button');

            if (groupButton) {
                groupButton.focus();
                e.preventDefault();
            }
        } else if (e.key === 'Escape') {
            this.closeSubMenu();
        }
    }

    render() {
        return html`
            <div class="menu" @keydown=${this.handleKeyDown}>
                ${this.buttons.map((item, index) => {
                    if (item.type === 'button') {
                        const buttonItem = item as ButtonActionItem;

                        return html`
                            <button
                                @click=${() => this.handleClick(buttonItem.action)}
                                tabindex="0"
                                class="button"
                            >
                                ${buttonItem.icon
                                    ? html`<img
                                          src="${buttonItem.icon}"
                                          alt="${buttonItem.label} icon"
                                      />`
                                    : ''}
                                ${buttonItem.label}
                            </button>
                        `;
                    }

                    if (item.type === 'group') {
                        const groupItem = item as GroupActionItem;
                        const isOpen = this.openGroupIndex === index;

                        return html`
                            <div
                                class="menu-group ${isOpen ? 'open' : ''}"
                                @mouseenter=${this.cancelCloseTimer}
                                @mouseleave=${this.handleMouseOut}
                            >
                                <button
                                    @click=${() => this.handleClick(undefined, index)}
                                    tabindex="0"
                                    class="button"
                                >
                                    ${groupItem.icon
                                        ? html`<img
                                              src="${groupItem.icon}"
                                              alt="${groupItem.label} icon"
                                          />`
                                        : ''}
                                    ${groupItem.label}
                                    <span class="chevron"></span>
                                </button>
                                <div
                                    class="submenu"
                                    @mouseenter=${this.cancelCloseTimer}
                                    @mouseleave=${this.handleMouseOut}
                                >
                                    ${groupItem.children.map((child, subIndex) => {
                                        if (child.type === 'button') {
                                            const buttonChild = child as ButtonActionItem;

                                            return html`
                                                <button
                                                    @click=${() =>
                                                        this.handleClick(buttonChild.action)}
                                                    tabindex="${subIndex}"
                                                    class="button"
                                                >
                                                    ${buttonChild.icon
                                                        ? html`<img
                                                              src="${buttonChild.icon}"
                                                              alt="${buttonChild.label} icon"
                                                          />`
                                                        : ''}
                                                    ${buttonChild.label}
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
