import { CoolComponent } from '../component';

import html from './card.html';

export class DataCard extends CoolComponent<{ clickedText: string }> {
    constructor() {
        super(html, { clickedText: 'NOT CLICKED' }, ['cardName']);
    }

    onClick() {
        this.setState({ clickedText: this.state.clickedText === 'CLICKED' ? 'NOT CLICKED' : 'CLICKED' });
    }

    beforeRender() {
        this.addEventListener('click', this.onClick);
    }

    set cardName(name: string) {
        this.setAttribute('card-name', name);
        this.forceRender();
    }

    get cardName() {
        return this.getAttribute('card-name');
    }

    set to(path: string) {
        this.setAttribute('to', path);
        this.forceRender();
    }

    get to() {
        return this.getAttribute('to');
    }
}

window.customElements.define('data-card', DataCard);
