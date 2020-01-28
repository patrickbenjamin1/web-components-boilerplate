import { CoolComponent, html } from '../component';

export class View extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <div class="view">
            <style>
                .view {
                    padding: var(--spacing-large);
                    padding-top: calc(var(--header-height) + var(--spacing-large));

                    box-sizing: border-box;
                }
            </style>
            <slot></slot>
        </div>
    `;
}

window.customElements.define('page-view', View);
