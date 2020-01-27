import { HTMLHelpers } from '../helpers/html';

export class CoolComponent<TState = {}> extends HTMLElement {
    private readonly html: string;
    private shadow: ShadowRoot;

    private willRender: boolean = false;

    private customAttributeNames: string[];

    processHtml(html: string) {
        return html;
    }

    constructor(html: string, initialState?: TState, customAttributeNames?: string[]) {
        super();

        this.html = html;
        this.state = initialState;
        this.customAttributeNames = customAttributeNames;
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
            ...(this.customAttributeNames
                ? this.customAttributeNames
                      .map(attribute => !!(this as any)[attribute] && { variable: attribute, value: (this as any)[attribute] })
                      .filter(a => !!a)
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
