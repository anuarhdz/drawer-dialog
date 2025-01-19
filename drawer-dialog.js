const style = /* css */ `
    :host {
      display: contents;
    }

    dialog {
      max-height: unset;
      max-width: unset;
      outline: none;
    }

    dialog {
      border: var(--drawer-dialog-border, none);
      border-radius: var(--drawer-dialog-border-radius, 0);
      margin: var(--drawer-dialog-margin, 0);
      padding: var(--drawer-dialog-padding, 0);
      block-size: var(--drawer-dialog-block-size, 100%);
      inline-size: var(--drawer-dialog-inline-size, 100%);
      max-inline-size: var(--drawer-dialog-max-inline-size, max(25%, 480px));
      inset-block-start: var(--drawer-dialog-inset-block-start, 0);
      inset-block-end: var(--drawer-dialog-inset-block-end, 0);
      inset-inline-start: var(--drawer-dialog-inset-inline-start, unset);
      inset-inline-end: var(--drawer-dialog-inset-inline-end, 0);
      box-shadow: var(--drawer-dialog-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05));
    }

    dialog,
    dialog::backdrop {
      overscroll-behavior: contain;
    }

    dialog::backdrop {
      background: var(--drawer-dialog-backdrop-background, rgb(0 0 0 / 50%));
      backdrop-filter: var(--drawer-dialog-backdrop-filter, blur(1px));
    }

    dialog[open],
    dialog[open]::backdrop {
      opacity: 1;
    }

    dialog[open] {
      transform: translateX(0);
    }

    dialog,
    dialog::backdrop {
      transition: opacity var(--drawer-dialog-transition-duration, 0.3s), transform var(--drawer-dialog-transition-duration, 0.3s), display var(--drawer-dialog-transition-duration, 0.3s)  allow-discrete, overlay var(--drawer-dialog-transition-duration, 0.3s)  allow-discrete;
      transition-timing-function: var(--drawer-dialog-ease, cubic-bezier(0.38, 0.005, 0.215, 1));
      opacity: 0;
    }

    dialog {
      transform: var(--drawer-dialog-transform-hide, translateX(100%));
    }

    @starting-style {
      dialog[open],
      dialog[open]::backdrop {
        opacity: 0;
      }

      dialog[open] {
        transform: var(--drawer-dialog-transform-hide, translateX(100%));
      }
    }
  `;
const dialogTemplate = /*html*/ `<dialog part="dialog"><slot></slot></dialog>`;
const template = document.createElement("template");
template.innerHTML = /*html*/ `<style>${style}</style>${dialogTemplate}`;

export class DrawerDialog extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this._dialog = shadowRoot.querySelector("dialog");
  }

  connectedCallback() {
    this.upgradeProperty("open");
    this._dialog.addEventListener("click", this.onclick.bind(this));
  }

  // from https://web.dev/custom-elements-best-practices/#make-properties-lazy
  /**
   * @param {string} prop
   *
   * @internal
   */
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    const isOpen = Boolean(value);
    const attributeAction = isOpen ? "toggleAttribute" : "removeAttribute";
    this[attributeAction]("open");
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name) {
    if (name === "open") this.effect();

    document.querySelectorAll("button[data-drawer-dialog]").forEach((btn) => {
      btn.setAttribute("aria-expanded", this.open ? "true" : "false");
    });
    document.documentElement.style.overflow = this.open ? "hidden" : "";
    document.body.style.overflow = this.open ? "hidden" : "";
  }

  effect() {
    this.open ? this._dialog.showModal() : this._dialog.close();
  }

  show() {
    if (this.open) return;

    this.open = true;
  }

  hide() {
    if (!this.open) return;

    this.open = false;
  }

  onclick(event) {
    if (this.contains(event.target)) return;

    this.hide();
  }
}

customElements.define("drawer-dialog", DrawerDialog);
