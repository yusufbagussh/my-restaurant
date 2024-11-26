// src/scripts/components/loading-indicator.js

class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.7);
          z-index: 999;
        }

        .spinner {
          width: 60px; /* Ukuran spinner */
          height: 60px;
          border: 6px solid #00796b; /* Line lebih tebal */
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
export default LoadingIndicator;
