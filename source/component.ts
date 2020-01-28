export class CoolComponent<TState = {}, TProps = {}> extends HTMLElement {
    private shadow: ShadowRoot;

    private willRender: boolean = false;

    constructor(initialState?: TState) {
        super();

        this.state = initialState || ({} as TState);
    }

    getMarkup: () => string = () => '';

    private render() {
        this.shadow.innerHTML = '';

        const templateElement = document.createElement('template');

        templateElement.innerHTML = this.getMarkup();

        if (!this.shouldRender(templateElement)) {
            return;
        }

        this.beforeRender(templateElement);
        if (templateElement.content.firstChild) {
            this.shadow.appendChild(templateElement.content.firstChild);
            this.afterRender(templateElement);
        }
    }

    forceRender() {
        this.render();
    }

    /** STATE */

    state: TState;

    setState = (newState: Partial<TState>, callback?: (newState: TState) => void) => {
        this.state = {
            ...this.state,
            ...newState,
        };

        if (!this.willRender) {
            this.willRender = true;

            setTimeout(() => {
                this.render();
                this.willRender = false;
                if (callback) {
                    callback(this.state);
                }
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    shouldRender(templateElement: HTMLTemplateElement) {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    beforeRender(templateElement: HTMLTemplateElement) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    afterRender(templateElement: HTMLTemplateElement) {}

    shouldConnect() {
        return true;
    }

    beforeConnect() {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    afterConnect(shadowRoot: ShadowRoot) {}

    beforeDisconnect() {}
}

/*
 * basically, just a tag to make the lit-html extension work without needing the module, and without getting its special HtmlTemplate type
 * may be expanded later, however, to use more
 * */

export function html(stringArray: TemplateStringsArray, ...variables: any) {
    return stringArray
        .map((str, i) => str + (variables[i] || ''))
        .join('')
        .trim();
}
