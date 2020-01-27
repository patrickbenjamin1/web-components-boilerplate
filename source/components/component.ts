import { HTMLHelpers } from '../helpers/html';

export class CoolComponent<TState = {}, TProps = {}> extends HTMLElement {
    private readonly html: string;
    private shadow: ShadowRoot;

    private willRender: boolean = false;

    processHtml(html: string) {
        return html;
    }

    constructor(html: string, initialState?: TState) {
        super();

        this.html = html;
        this.state = initialState || ({} as TState);
    }

    private render() {
        this.shadow.innerHTML = '';

        const templateElement = document.createElement('template');

        templateElement.innerHTML = this.processHtml ? this.processHtml(this.html) : this.html;
        templateElement.innerHTML = HTMLHelpers.replaceVariables(templateElement.innerHTML, [
            ...(this.state
                ? Object.keys(this.state).map(key => ({
                      variable: key,
                      value: (this.state as any)[key],
                  }))
                : []),
            ...(this.props
                ? Object.keys(this.props).map(key => ({
                      variable: key,
                      value: (this.props as any)[key],
                  }))
                : []),
        ]);

        if (!this.shouldRender(templateElement)) {
            return;
        }

        this.beforeRender(templateElement);
        this.shadow.appendChild(templateElement.content.firstChild);
        this.afterRender(templateElement);
    }

    forceRender() {
        this.render();
    }

    /** STATE */

    state: TState;
    setState = (newState: Partial<TState>) => {
        this.state = {
            ...this.state,
            ...newState,
        };

        if (!this.willRender) {
            this.willRender = true;

            setTimeout(() => {
                this.render();
                this.willRender = false;
            });
        }
    };

    /** PROPS */

    get props(): TProps {
        const attributeNames = this.getAttributeNames();
        return attributeNames.reduce((currentAttributes, attributeName) => {
            // convert key to camelcase
            const key = attributeName.replace(/-\w/g, str => str?.[1]?.toUpperCase());
            const value: string = this.getAttribute(attributeName);

            return {
                ...currentAttributes,
                [key]: value,
            };
        }, {}) as TProps;
    }

    /** rerender on props change */

    private mutationObserver = new MutationObserver(this.render);
    addMutationObserver() {
        this.mutationObserver.observe(this, {
            attributes: true,
        });
    }

    /** LIFECYCLE */

    connectedCallback() {
        if (!this.shouldConnect) {
            return;
        }

        this.beforeConnect();

        this.shadow = this.attachShadow({ mode: 'closed' });
        this.render();

        this.afterConnect(this.shadow);
    }

    disconnectedCallback() {
        this.beforeDisconnect();
    }

    attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
        if (newValue !== oldValue) {
            (this as any)[attrName] = this.getAttribute(attrName);
            this.forceRender();
        }
    }

    /** LIFECYCLE HOOKS */

    shouldRender(templateElement: HTMLTemplateElement) {
        return true;
    }
    beforeRender(templateElement: HTMLTemplateElement) {}
    afterRender(templateElement: HTMLTemplateElement) {}
    shouldConnect() {
        return true;
    }
    beforeConnect() {}
    afterConnect(shadowRoot: ShadowRoot) {}
    beforeDisconnect() {}
}
