// @ts-check

export default class Example {
  constructor(element) {
    this.element = element;
  }

  init() {
    const form = document.createElement('form');
    const divFormElement = document.createElement('div');
    divFormElement.classList.add('form-group');
    divFormElement.innerHTML = '<input class="form-control" id="inputInfo" placeholder="">';
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'submit';
    form.append(divFormElement, submitButton);
    this.element.append(form);
  }
}
