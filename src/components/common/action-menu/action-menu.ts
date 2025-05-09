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
        }

        .menu-group {
            position: relative;
        }

        .submenu {
            display: none;
            position: absolute;
            bottom: 100%;
            right: 0; /* Align submenu to the right of the parent button */
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
            gap: 0.5rem; /* Space between icon and label */
            padding: 0.5rem;
            background: #fff;
            border: 1px solid #ccc;
            cursor: pointer;
        }

        .button img {
            width: 16px; /* Adjust icon size */
            height: 16px;
        }

        /* Chevron styling */
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
            transform: rotate(180deg); /* Rotate the chevron when open */
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

    render() {
        return html`
            <div class="menu">
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
                                <div class="submenu">
                                    ${groupItem.children.map((child, subIndex) => {
                                        if (child.type === 'button') {
                                            const buttonChild = child as ButtonActionItem;

                                            return html`
                                                <button
                                                    @click=${() =>
                                                        this.handleClick(buttonChild.action)}
                                                    tabindex="${subIndex ===
                                                    groupItem.children.length - 1
                                                        ? 1
                                                        : 2}"
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
