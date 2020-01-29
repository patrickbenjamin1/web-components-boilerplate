import '@webcomponents/webcomponentsjs';

import { CoolComponent, html } from './component';

import './components/card';
import './components/route';
import './components/view';
import './components/header';
import './components/dropDown';

import './views/home';
import './views/page1';

import './styles';

class EntryPoint extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () =>
        html`
            <cool-header></cool-header>

            <location-route path="/" exact="true">
                <home-view></home-view>
            </location-route>

            <location-route path="/thing/:thingName" exact="true">
                <page-1-view></page-1-view>
            </location-route>
        `;
}

window.customElements.define('entry-point', EntryPoint);
