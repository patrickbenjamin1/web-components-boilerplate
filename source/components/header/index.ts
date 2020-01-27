import { CoolComponent } from '../component';

import html from './header.html';

export class Header extends CoolComponent {
    constructor() {
        super(html);
    }
}

window.customElements.define('cool-header', Header);
