import { CoolComponent } from '../../components/component';

import html from './home.html';

export class HomeView extends CoolComponent {
    constructor() {
        super(html);
    }
}

window.customElements.define('home-view', HomeView);
