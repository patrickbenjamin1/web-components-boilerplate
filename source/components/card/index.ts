import { CoolComponent } from '../component';

import html from './card.html';

export class DataCard extends CoolComponent<{ clickedText: string }, { cardName: string }> {
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
