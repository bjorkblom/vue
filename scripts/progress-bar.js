class ProgressBar extends HTMLElement {

    constructor() {
      super();
      //this.shadow = this.createShadowRoot();
      this.shadow = this.attachShadow({
        mode: 'open'
      });
      this._complete = 0;
    }
    static get observedAttributes() {
      return ["complete"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      var innerBar = this.shadow.querySelector('.progress-bar-inner');
      switch (name) {
        case 'complete':
          this._complete = parseInt(newValue, 10) || 0;
          break;
      }
  
    }
    connectedCallback() {
    console.log(this.offsetParent);
      var template = `
          <style>
            .progress-bar {
              width: 100%;
            height: 30px;
            background-color: #dddddd;
          }
          .progress-bar-inner {
              height: 100%;
            line-height: 30px;
            background: orange;
            text-align: center;
            transition: width 0.25s;
          }
        </style>
          <div class="progress-bar">
            <div class="progress-bar-inner">${this._complete}</div>
        </div>
      `;
      this.shadow.innerHTML = template;
    }
  
    get complete() {
      return this._complete;
    }
  
    set complete(val) {
      this.setAttribute('complete', val);
    }
  }
  
  window.customElements.define('progress-bar', ProgressBar);
  
  
  