import { CoolComponent, html } from '../component';

interface ICardProps {
    cardName: string;
    to: string;
}

export class DataCard extends CoolComponent<{}, ICardProps> {
    constructor() {
        super({ clickedText: 'NOT CLICKED' });
    }

    getMarkup = () => {
        const inner = html`
            <div class="card">
                <style>
                    .card {
                        box-shadow: var(--shadow);
                        padding: var(--spacing-small);
                        margin-bottom: var(--spacing-medium);
                        transition: box-shadow var(--transition-quick);
                        user-select: none;
                        cursor: pointer;
                    }

                    .card .card-bottom {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    .card:hover {
                        box-shadow: var(--shadow-big);
                    }

                    a {
                        text-decoration: none;
                    }

                    a {
                        color: black;
                    }
                </style>

                <div class="card-bottom">
                    <h1>${this.props.cardName}</h1>
                </div>

                <slot></slot>
            </div>
        `;

        return this.props.to
            ? html`
                  <a href="${this.props.to}">${inner}</a>
              `
            : inner;
    };
}

window.customElements.define('data-card', DataCard);
