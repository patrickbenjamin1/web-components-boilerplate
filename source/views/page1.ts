import { CoolComponent, html } from '../component';

const thing = ['a', 'b', 'c'];

export class Page1View extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <page-view>
            <p>THIS IS PAGE 1</p>

            <data-card card-name="thing"><p>HELLOY</p></data-card>

            ${thing
                .map(
                    t =>
                        html`
                            <data-card card-name="${t}"><p>HELLO</p></data-card>
                        `,
                )
                .join('')}
        </page-view>
    `;
}

window.customElements.define('page-1-view', Page1View);
