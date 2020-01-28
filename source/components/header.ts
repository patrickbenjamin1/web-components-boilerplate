import { CoolComponent, html } from '../component';

export class Header extends CoolComponent {
    constructor() {
        super();
    }

    getMarkup = () => html`
        <header class="header">
            <style>
                header {
                    position: fixed;
                    left: 0;
                    right: 0;
                    height: var(--header-height);
                    padding: var(--spacing-small);

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    background-color: white;
                    box-shadow: var(--shadow);

                    box-sizing: border-box;
                }

                a.logo {
                    text-decoration: none;
                    color: black;
                    transition: color var(--transition-quick);
                }

                a.logo:hover {
                    color: gray;
                }
            </style>
            <a href="/" class="logo"><h2>my cool website</h2></a>

            <div class="header-right">
                <drop-down text="check it">
                    <p>I'M IN THE DROP DOWN</p>
                </drop-down>
            </div>
        </header>
    `;
}

window.customElements.define('cool-header', Header);
