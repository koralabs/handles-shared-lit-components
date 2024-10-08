import { LitElement, html, css } from "lit";
import { customElement, state } from 'lit/decorators.js';

@customElement('infinite-scroll')
export class InfiniteScroll extends LitElement {
    @state() loading: boolean = false;
    @state() help: string = '';
    @state() loadMoreItems: () => void = () => { };

    constructor() {
        super();
    }

    firstUpdated() {
        this.addEventListener('scroll-bottom', this.handleScrollBottom.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('scroll-bottom', this.handleScrollBottom.bind(this));
    }

    helpLogger() {
        if (this.help === 'help') {
            console.info(`
            To use the InfiniteScroll component, you can follow these guidelines:
            
            1. **Slotted elements**:
                - Use a \`div\` with \`slot="scroll-content"\` to define the content that will be displayed within the infinite scroll area.
                - The content should be structured such that it can grow dynamically as more items are loaded.

            2. **Handle data loading**:
                - Implement the \`handleScrollBottom\` method to manage data loading when the user scrolls to the bottom.
                - Trigger loading of new content (e.g., fetching data from an API) in this method.

            3. **Properties**:
                - \`loading\`: A boolean property that indicates whether data is currently being loaded. You can bind this to a loading spinner or message in your UI.
                - \`scrollContent\`: You can provide slotted elements that will render as children inside the InfiniteScroll component.
                Example usage:
                const InfiniteScroll = (event: Event) => {
                    const mainSection = event.currentTarget as HTMLElement;
                    const scrollPosition = mainSection.scrollTop + mainSection.clientHeight;
                    const scrollHeight = mainSection.scrollHeight;

                    // Check if scrolled to bottom (or near bottom)
                    if (scrollPosition >= scrollHeight - 50) {
                        const infiniteScroll = mainSection.shadowRoot?.querySelector('infinite-scroll');
                        infiniteScroll?.dispatchEvent(new CustomEvent('scroll-bottom', { bubbles: true, composed: true }));
                        console.log('Scrolled to bottom');
                    }
                };

                <custom-element .addFunction=\${addFunction} .infiniteScroll=\${InfiniteScroll}></custom-element>
        `);
        }
    }

    handleScrollBottom() {
    }

    render() {
        return html`
        <slot name="scroll-content"></slot>
        `;
    }

}