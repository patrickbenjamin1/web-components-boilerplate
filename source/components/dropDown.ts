import { CoolComponent, html } from '../component';

interface IDropDownState {
    open: boolean;
}

interface IDropDownProps {
    text: string;
}

export class DropDown extends CoolComponent<IDropDownState, IDropDownProps> {
    constructor() {
        super({ open: false });
    }

    onClick() {
        this.setState({ open: !this.state.open });
    }

    afterRender() {
        this.addEventListener('click', this.onClick);
    }

    beforeDisconnect() {
        this.removeEventListener('click', this.onClick);
    }

    getMarkup = () => html`
        <div class="drop-down">
            <style>
                .drop-down {
                    position: relative;
                    cursor: pointer;
                }

                .drop-down .drop-down-inner {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 200px;
                    background-color: white;
                    box-shadow: var(--shadow);
                    padding: var(--spacing-small);
                }
            </style>

            <p>${this.props.text}</p>

            ${this.state.open &&
                html`
                    <div class="drop-down-inner">
                        <slot></slot>
                    </div>
                `}
        </div>
    `;
}

window.customElements.define('drop-down', DropDown);
