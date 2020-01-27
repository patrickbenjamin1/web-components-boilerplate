import { CoolComponent } from '../component';

import html from './card.html';
import { HTMLHelpers } from '../../helpers/html';

export class DataCard extends CoolComponent {
    constructor() {
        super(html);
    }

    processHtml(html: string) {
        return HTMLHelpers.replaceVariables(html, [
            {
                variable: 'card-name',
                value: this.cardName,
            },
            {
                variable: 'to',
                value: this.to,
            },
        ]);
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
