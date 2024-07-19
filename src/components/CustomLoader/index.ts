import { html, css, LitElement } from 'lit';

export class CustomLoader extends LitElement {
  static renderTag = () => html`<custom-loader></custom-loader>`;
  static styles = css`
    .loader {
      display: flex;
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      height: 100vh;
      width: 100vw;
      position: relative;
    }

    .green-svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: rotate-forward 2s linear infinite;
      width: 48px;
      height: 48px;
      fill: none;
      z-index: 2;
    }

    .blue-svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: rotate-reverse 2s linear infinite;
      width: 24px;
      height: 24px;
      fill: none;
      z-index: 1;
    }

    @keyframes rotate-forward {
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @keyframes rotate-reverse {
      100% {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }
  `;



  render() {
    return html`
      <lit-button-small> Small Button </lit-button-small>
  <lit-button-medium> Medium Button </lit-button-medium>
    <lit-button-large> Large Button </lit-button-large>
      <div class="loader">
        <svg class="green-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
          <path
            d="M24.9883 47.0966C24.9883 47.7594 24.4507 48.2997 23.7888 48.2666C21.0469 48.1294 18.3457 47.5226 15.8039 46.4697C12.8921 45.2636 10.2463 43.4958 8.01772 41.2672C5.78911 39.0386 4.02128 36.3928 2.81517 33.481C1.60906 30.5692 0.98828 27.4483 0.988281 24.2966C0.988282 21.1449 1.60906 18.024 2.81518 15.1122C4.02129 12.2004 5.78912 9.55465 8.01772 7.32605C10.2463 5.09744 12.8921 3.32961 15.8039 2.1235C18.3457 1.07064 21.0469 0.463815 23.7888 0.326608C24.4507 0.293486 24.9883 0.833874 24.9883 1.49662C24.9883 2.15936 24.4506 2.69314 23.7889 2.72994C21.3623 2.86489 18.9729 3.40858 16.7223 4.34082C14.1017 5.42632 11.7205 7.01736 9.71478 9.0231C7.70904 11.0288 6.11799 13.41 5.03249 16.0306C3.94698 18.6513 3.38828 21.4601 3.38828 24.2966C3.38828 27.1332 3.94698 29.9419 5.03248 32.5626C6.11798 35.1832 7.70903 37.5644 9.71477 39.5701C11.7205 41.5759 14.1017 43.1669 16.7223 44.2524C18.9729 45.1846 21.3623 45.7283 23.7889 45.8633C24.4506 45.9001 24.9883 46.4339 24.9883 47.0966Z"
            fill="#0DDD60"
          />
        </svg>
<svg class="blue-svg" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5.9883 1.59662C5.9883 0.878645 6.57174 0.289883 7.28613 0.361562C8.54809 0.488182 9.78711 0.799042 10.9632 1.28618C12.5404 1.93949 13.9735 2.89707 15.1807 4.10423C16.3878 5.31139 17.3454 6.7445 18.0013 8.32173C18.652 9.89897 18.9883 11.5894 18.9883 13.2966C18.9883 15.0038 18.652 16.6943 18.0013 18.2715C17.3454 19.8487 16.3878 21.2818 15.1807 22.489C13.9735 23.6962 12.54042 24.6537 10.9632 25.3071C9.78711 25.7942 8.54809 26.1051 7.28613 26.2317C6.57174 26.3033 5.98828 25.7146 5.98828 24.9966C5.98828 24.2786 6.57254 23.705 7.2849 23.6155C8.20513 23.4998 9.10772 23.2614 9.96819 22.905C11.2299 22.3823 12.3765 21.6163 13.3422 20.6505C14.3079 19.6848 15.074 18.5383 15.5966 17.2765C16.1193 16.0147 16.3883 14.6624 16.3883 13.2966C16.3883 11.9309 16.1193 10.5785 15.5966 9.31671C15.074 8.05492 14.3079 6.90843 13.3422 5.94271C12.3765 4.97698 11.2299 4.21092 9.96819 3.68827C9.10772 3.33185 8.20513 3.09339 7.2849 2.97776C6.57254 2.88825 5.9883 2.31459 5.9883 1.59662Z"
    fill="#4DA6FF"
    transform="scale(-1, 1) translate(-20, 0)"
  />
</svg>


      </div>
    `;
  }
}

customElements.define('custom-loader', CustomLoader);
