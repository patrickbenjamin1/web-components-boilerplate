import { CoolComponent, html } from '../component';

const thing = ['a', 'b', 'c'];

interface IPage1ViewProps {
    thingName: string;
}

export class Page1View extends CoolComponent<{}, IPage1ViewProps> {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <page-view>
            <p>${this.props.thingName}</p>

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
