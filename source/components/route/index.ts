import { CoolComponent } from '../component';

class Route extends CoolComponent {
    constructor() {
        super('<slot></slot>');
    }

    shouldRender() {
        return this.exact ? window.location.pathname === this.path : window.location.pathname.indexOf(this.path) > -1;
    }

    set path(name: string) {
        this.setAttribute('path', name);
    }

    get path() {
        return this.getAttribute('path');
    }

    set exact(isExact: boolean) {
        this.setAttribute('exact', isExact ? ' ' : undefined);
    }

    get exact() {
        return this.hasAttribute('exact');
    }
}

window.customElements.define('location-route', Route);
