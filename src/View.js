// @ts-check
import i18next from 'i18next';
import languages from './languages/languages';

export default class View {
  constructor(element) {
    this.element = element;
  }

  init() {
    // dropdownLang
    const languageContainer = document.createElement('div');
    languageContainer.classList.add('dropdown');
    const dropDownBtn = document.createElement('button');
    dropDownBtn.classList.add('btn', 'btn-primary', 'dropdown-toggle', 'float-right');
    dropDownBtn.id = 'dropdownMenuButton';
    dropDownBtn.setAttribute('data-toggle', 'dropdown');
    // dropButton.setAttribute('aria-haspopup', 'true');
    // dropButton.setAttribute('aria-expanded', 'false');

    dropDownBtn.textContent = languages.ru;
    const menuDivElement = document.createElement('div');
    menuDivElement.classList.add('dropdown-menu');
    // menuDivElement.setAttribute('aria-labelledby', 'dropdownMenuButton');
    // const langButton1 = document.createElement('a');
    // langButton1.classList.add('dropdown-item');
    // langButton1.setAttribute('href', '#');
    // langButton1.id = 'ru';
    // langButton1.textContent = 'Русский';
    // const langButton2 = document.createElement('a');
    // langButton2.classList.add('dropdown-item');
    // langButton2.setAttribute('href', '#');
    // langButton2.id = 'en';
    // langButton2.textContent = 'English';
    // menuDivElement.append(langButton1, langButton2);
    const langs = Object.keys(languages);
    langs.forEach((lang) => {
      const langButton = document.createElement('a');
      langButton.classList.add('dropdown-item');
      langButton.id = lang;
      langButton.setAttribute('href', '#');
      langButton.textContent = languages[lang];
      menuDivElement.append(langButton);
    });
    languageContainer.append(dropDownBtn, menuDivElement);

    // top container
    const main = document.createElement('main');
    main.classList.add('flex-grow-1');
    const header = document.createElement('h1');
    header.classList.add('dispay-3');
    header.setAttribute('style', 'font-size: 4.5rem');
    header.textContent = 'RSS агрегатор';
    const paragraphEl = document.createElement('p');
    paragraphEl.classList.add('lead');
    paragraphEl.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
    const form = document.createElement('form');
    form.setAttribute('action', 'true');
    form.classList.add('rss-form');
    const divFormRow = document.createElement('div');
    divFormRow.classList.add('form-row');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('col');
    const input = document.createElement('input');
    input.classList.add('form-control', 'form-control-lg', 'w-100', 'input-rss');
    input.setAttribute('autofocus', 'true');
    input.setAttribute('name', 'url');
    input.setAttribute('name', 'url');
    input.id = 'inputInfo';
    input.setAttribute('aria-label', 'url');
    input.setAttribute('required', 'true');
    // input.placeholder = 'ссылка RSS';
    inputContainer.append(input);
    const submitContainer = document.createElement('div');
    submitContainer.classList.add('col-auto');
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('aria-label', 'add');
    submitButton.classList.add('btn', 'btn-lg', 'btn-primary', 'px-sm-5', 'addBtn');
    submitButton.textContent = i18next.t('btnViewDescription');
    // submitButton.textContent = 'Add';
    submitContainer.append(submitButton);
    divFormRow.append(inputContainer);
    divFormRow.append(submitContainer);

    form.append(divFormRow);
    const paragraphHelp = document.createElement('p');
    paragraphHelp.classList.add('text-muted', 'my-1', 'paragraphExample');
    const feedback = document.createElement('div');
    feedback.classList.add('feedback', 'text-success');
    const topRowDiv = document.createElement('div');
    topRowDiv.classList.add('row');
    const rowDivStyleContainer = document.createElement('div');
    rowDivStyleContainer.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
    rowDivStyleContainer.append(
      languageContainer,
      header,
      paragraphEl,
      form,
      paragraphHelp,
      feedback
    );
    topRowDiv.append(rowDivStyleContainer);

    // mainContainer
    const containerDiv = document.createElement('section');
    containerDiv.classList.add('container-fluid', 'p-5');
    const rowDiv = document.createElement('div');
    const rowDivFeeds = document.createElement('div');
    rowDiv.classList.add('row');
    rowDivFeeds.classList.add('row');
    const feedDiv = document.createElement('div');
    feedDiv.classList.add('feeds', 'col-md-10', 'col-lg-8', 'mx-auto');
    rowDivFeeds.append(feedDiv);
    const postsDiv = document.createElement('div');
    postsDiv.classList.add('posts', 'col-md-10', 'col-lg-8', 'mx-auto');
    rowDiv.append(postsDiv);
    containerDiv.append(rowDivFeeds, rowDiv);
    const topContainer = document.createElement('section');
    topContainer.classList.add('container-fluid', 'bg-dark', 'p-5');
    topContainer.append(topRowDiv);
    main.append(topContainer, containerDiv);

    // modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade');
    modalContainer.id = 'modal';
    modalContainer.setAttribute('tabinde', '-1');
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    // role
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    const closeBtnModal = document.createElement('button');
    closeBtnModal.classList.add('close');
    closeBtnModal.setAttribute('type', 'button');
    closeBtnModal.setAttribute('data-dismiss', 'modal');
    closeBtnModal.setAttribute('aria-label', 'Close');
    const symbolClose = document.createElement('span');
    symbolClose.setAttribute('aria-hidden', 'true');
    symbolClose.textContent = 'x';
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    const linkButton = document.createElement('a');
    linkButton.classList.add('btn', 'btn-primary', 'full-article');
    linkButton.setAttribute('href', '#');
    linkButton.setAttribute('role', 'button');
    linkButton.setAttribute('rel', 'noopener noreferrer');
    linkButton.textContent = i18next.t('readFull');
    const buttonClose = document.createElement('button');
    buttonClose.classList.add('btn', 'btn-secondary', 'btn-close');
    buttonClose.setAttribute('type', 'button');
    buttonClose.setAttribute('data-dismiss', 'modal');
    buttonClose.textContent = i18next.t('btnClose');

    modalHeader.append(modalTitle, closeBtnModal);
    modalFooter.append(linkButton, buttonClose);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modalContainer.append(modalDialog);

    this.element.append(modalContainer, main);
  }
}
