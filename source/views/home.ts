import { CoolComponent, html } from '../component';

export class HomeView extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <page-view>
            <data-card to="/page-1" card-name="card 1">This is a card component with some content</data-card>
            <data-card to="/page-2" card-name="card 2">This is the same card component with some content</data-card>
        </page-view>
    `;
}

window.customElements.define('home-view', HomeView);
