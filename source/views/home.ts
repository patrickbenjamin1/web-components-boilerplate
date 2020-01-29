import { CoolComponent, html } from '../component';

export class HomeView extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <page-view>
            <data-card to="/thing/thing number one is here" card-name="card 1">This is a card component with some content</data-card>
            <data-card to="/thing/thing nunmber two is this one" card-name="card 2">
                This is the same card component with some content
            </data-card>
        </page-view>
    `;
}

window.customElements.define('home-view', HomeView);
