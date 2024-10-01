import {createElement} from '../render';

function createHeaderContainerViewTemplate() {
  return (
    `<div class="page-body__container  page-header__container">
       <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">
     </div>`
  );
}

export default class HeaderContainerView {
  getTemplate() {
    return createHeaderContainerViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
