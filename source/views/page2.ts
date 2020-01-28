import { CoolComponent, html } from '../component';

export class Page2View extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <page-view>
            <p>THIS IS PAGE 2</p>
        </page-view>
    `;
}

window.customElements.define('page-2-view', Page2View);
