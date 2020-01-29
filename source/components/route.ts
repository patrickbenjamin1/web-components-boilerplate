import { CoolComponent, html } from '../component';
import { TextHelpers } from '../helpers/text';

interface IRouteProps {
    exact: string;
    path: string;
}

class Route extends CoolComponent<{}, IRouteProps> {
    constructor() {
        super();
    }

    getVariablesFromPath = <T = { [key: string]: any }>(): T => {
        const path = this.props.path.slice(1);
        const url = window.location.pathname.slice(1);
        const pathBits = path.length ? path.split('/') : [];
        const urlBits = url.length ? url.split('/') : [];

        if (pathBits.length <= urlBits.length) {
            const variables = {};

            if (
                pathBits.every((pathBit, i) => {
                    if (pathBit[0] === ':') {
                        (variables as any)[pathBit.slice(1)] = decodeURIComponent(urlBits[i]);
                        return true;
                    }
                    return urlBits[i] === pathBit;
                })
            ) {
                return variables as T;
            }
        }
    };

    checkPath = () => {
        const path = this.props.path.slice(1);
        const url = window.location.pathname.slice(1);
        const pathBits = path.length ? path.split('/') : [];
        const urlBits = url.length ? url.split('/') : [];

        const satisfiesLength = this.props.exact ? urlBits.length === pathBits.length : urlBits.length >= pathBits.length;

        return (
            satisfiesLength &&
            pathBits.every((pathBit, i) => {
                if (pathBit[0] === ':') {
                    return true;
                }
                return urlBits[i] === pathBit;
            })
        );
    };

    addVariablesToElement = (element: Element) => {
        const variables = this.getVariablesFromPath();

        Object.keys(variables).forEach(key => {
            element.setAttribute(TextHelpers.camelToKebab(key), variables[key]);
        });
    };

    afterRender() {
        for (let i = 0; !this.children || i < this.children.length; i++) {
            this.addVariablesToElement(this.children[i]);
        }
    }

    getMarkup = () =>
        this.checkPath()
            ? html`
                  <slot></slot>
              `
            : '';
}

window.customElements.define('location-route', Route);
