import { CoolComponent } from '../component';

import html from './view.html';

export class View extends CoolComponent {
    constructor() {
        super(html);
    }
}

window.customElements.define('page-view', View);
