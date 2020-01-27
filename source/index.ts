import '@webcomponents/webcomponentsjs';

import { CoolComponent } from './components/component';

import './components/card';
import './components/route';
import './components/view';
import './components/header';

import './views/home';
import './views/page1';
import './views/page2';

import './styles';

class EntryPoint extends CoolComponent {
    constructor() {
        super('<slot></slot>');
    }
}

window.customElements.define('entry-point', EntryPoint);
