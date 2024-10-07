import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HandleSmallSearchStyles } from './styles';

@customElement('handle-small-search')
export class HandleSmallSearch extends LitElement {
    @property({ type: String }) inputValue: string | undefined;
    @property({ type: Boolean }) open: boolean = false;
    @property({ type: String }) search: string | undefined;
    @property({ type: Boolean }) searching: boolean = false;
    @state() help: string = '';

    static styles = HandleSmallSearchStyles;

    firstUpdated() {
        this.helpLogger();
    }
    helpLogger() {
        if (this.help === 'help') {
            console.info(`
        HandleSmallSearch Component Usage Guide:

        This component provides a small search bar for searching handles. It supports live search input and can dispatch events when the input changes.

        Properties:
        - inputValue: (String) The current value of the search input.
        - open: (Boolean) A flag to determine if the search bar is open.
        - search: (String) A string to store the search term (if needed externally).
        - searching: (Boolean) Indicates whether a search is in progress (true when there is input).

        Methods:
        - handleInput(event): Handles input changes in the search bar and dispatches a 'input-change' event.
        - clearSearch(): Clears the search input and resets the component state.

        Events:
        - input-change: Dispatched when the input value changes, providing the new input value.
        
        Example Usage:
            1)
                <handle-small-search></handle-small-search>
            
                Listening for input changes:
                const searchComponent = document.querySelector('handle-small-search');
                searchComponent.addEventListener('input-change', (event) => {
                    console.log('Search input changed:', event.detail.inputValue);
                });
            2)

                const handleInputChange = (event: CustomEvent<{ inputValue: string }>) => {
                    const inputValue = event.detail.inputValue;
                    console.log("Input value from handle-small-search:", inputValue);
                };

                <select-handle .handleData=\${handleData}  .infiniteScroll="\${InfiniteScroll}">
                    <div slot="slottedSearch">
                        <handle-small-search @input-change="\${handleInputChange}"></handle-small-search>
                    </div>
                </select-handle>

        `);
        }
    }

    handleInput(event: { target: { value: string; }; }) {
        const inputValue = event.target?.value?.trim();
        if (inputValue !== '') {
            this.searching = true;
        } else {
            this.searching = false;
        }
        this.inputValue = inputValue;

        this.dispatchEvent(new CustomEvent('input-change', {
            detail: { inputValue },
            bubbles: true,
            composed: true
        }));

        this.requestUpdate();
    }

    renderSearchIcon() {
        return html`
            <svg class="search-svg ${this.open ? 'open' : ''}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
        `;
    }
    clearSearch() {
        this.searching = false;
        this.search = '';
        this.inputValue = '';
        this.requestUpdate();
    }

    renderSearch() {
        return html`
            <div class="permissions-field">
                <div class="search-icon-wrapper ${this.open ? 'open' : ''}">
                    ${this.renderSearchIcon()}
                </div>
                <input
                    onfocus= "this.placeholder = 'Type $ for exact match'"
                    onblur= "this.placeholder = 'search for your handle'"
                    class="input-form "
                    placeholder= 'search for your handle'                    
                    autocomplete="off"
                    .value="${this.inputValue || ''}"
                    @input="${this.handleInput}"
                />
                <div class="clear-search-wrapper ${this.open ? 'open' : ''} ${this.searching ? 'searching' : ''}" @click="${this.clearSearch}">
                    <svg class="clear-search " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
            </div>
        `;
    }
    render() {
        return html`
        <div style="position: relative; width: -webkit-fill-available">
            ${this.renderSearch()}
        </div>
        `
    }
}