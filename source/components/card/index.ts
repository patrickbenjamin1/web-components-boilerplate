import { CoolComponent } from '../component';

import html from './card.html';

interface ICardState {
    clickedText: string;
}

interface ICardProps {
    cardName: string;
    to: string;
}

export class DataCard extends CoolComponent<ICardState, ICardProps> {
    constructor() {
        super(html, { clickedText: 'NOT CLICKED' });
    }

    onClick() {
        this.setState({ clickedText: this.state.clickedText === 'CLICKED' ? 'NOT CLICKED' : 'CLICKED' });
    }

    beforeRender() {
        this.addEventListener('click', this.onClick);
    }
}

window.customElements.define('data-card', DataCard);
