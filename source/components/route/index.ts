import { CoolComponent } from '../component';

interface IRouteProps {
    exact: string;
    path: string;
}

class Route extends CoolComponent<{}, IRouteProps> {
    constructor() {
        super('<slot></slot>');
    }

    shouldRender() {
        return this.props.exact === ''
            ? window.location.pathname === this.props.path
            : window.location.pathname.indexOf(this.props.path) > -1;
    }
}

window.customElements.define('location-route', Route);
