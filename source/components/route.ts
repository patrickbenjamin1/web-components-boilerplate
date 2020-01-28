import { CoolComponent, html } from '../component';

interface IRouteProps {
    exact: string;
    path: string;
}

class Route extends CoolComponent<{}, IRouteProps> {
    constructor() {
        super();
    }

    getMarkup = () =>
        (this.props.exact === ''
          ? window.location.pathname === this.props.path
          : window.location.pathname.indexOf(this.props.path) > -1)
            ? html`
                  <slot></slot>
              `
            : '';
}

window.customElements.define('location-route', Route);
