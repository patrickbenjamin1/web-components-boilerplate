import { CoolComponent } from '../../components/component';

import html from './page2.html';

export class Page2View extends CoolComponent {
    constructor() {
        super(html);
    }
}

window.customElements.define('page-2-view', Page2View);
