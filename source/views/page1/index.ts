import { CoolComponent } from '../../components/component';

import html from './page1.html';

export class Page1View extends CoolComponent {
    constructor() {
        super(html);
    }
}

window.customElements.define('page-1-view', Page1View);
