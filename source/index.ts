import '@webcomponents/webcomponentsjs';

import { CoolComponent, html } from './component';

import './components/card';
import './components/route';
import './components/view';
import './components/header';
import './components/dropDown';

import './views/home';
import './views/page1';
import './views/page2';

import './styles';

class EntryPoint extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () =>
        html`
            <slot></slot>
        `;
}

window.customElements.define('entry-point', EntryPoint);
