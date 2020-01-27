export class CoolComponent extends HTMLElement {
    private readonly html: string;

    processHtml(html: string) {
        return html;
    }

    constructor(html: string) {
        super();

        this.html = html;
    }

    private render(shadow = this.shadowRoot) {
        shadow.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.processHtml ? this.processHtml(this.html) : this.html;

        if (!this.shouldRender(templateElement)) {
            return;
        }

        this.beforeRender(templateElement);

        shadow.appendChild(templateElement.content.firstChild);

        this.afterRender(templateElement);
    }

    forceRender() {
        this.render();
    }

    connectedCallback() {
        if (!this.shouldConnect) {
            return;
        }

        this.beforeConnect();

        const shadowRoot = this.attachShadow({ mode: 'closed' });
        this.render(shadowRoot);

        this.afterConnect(shadowRoot);
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
