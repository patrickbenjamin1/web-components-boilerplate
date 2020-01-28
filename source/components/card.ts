import { CoolComponent, html } from '../component';

interface ICardState {
    clickedText: string;
}

interface ICardProps {
    cardName: string;
    to: string;
}

export class DataCard extends CoolComponent<ICardState, ICardProps> {
    constructor() {
        super({ clickedText: 'NOT CLICKED' });
    }

    onClick() {
        this.setState({ clickedText: this.state.clickedText === 'CLICKED' ? 'NOT CLICKED' : 'CLICKED' });
    }

    beforeRender() {
        this.addEventListener('click', this.onClick);
    }

    beforeDisconnect() {
        this.removeEventListener('click', this.onClick);
    }

    getMarkup = () => html`
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
            </style>

            <div class="card-bottom">
                <a href="${this.props.to}">
                    <h1>${this.props.cardName}</h1>
                </a>
            </div>

            <p>${this.state.clickedText}</p>

            <slot></slot>
        </div>
    `;
}

window.customElements.define('data-card', DataCard);
