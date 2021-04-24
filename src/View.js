// @ts-check
export default class View {
  constructor(element) {
    this.element = element;
  }

  init() {
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
    const divFormRow = document.createElement('div');
    divFormRow.classList.add('form-row');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('col');
    const input = document.createElement('input');
    input.classList.add('form-control', 'form-control-lg', 'w-100', 'input-rss');
    input.id = 'inputInfo';
    input.placeholder = 'ссылка RSS';
    inputContainer.append(input);
    const submitContainer = document.createElement('div');
    submitContainer.classList.add('col-auto');
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-lg', 'btn-primary', 'px-sm-5');
    submitButton.textContent = 'Add';
    submitContainer.append(submitButton);
    divFormRow.append(inputContainer);
    divFormRow.append(submitContainer);

    form.append(divFormRow);
    const paragraphHelp = document.createElement('p');
    paragraphHelp.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';
    paragraphHelp.classList.add('text-muted', 'my-1');
    const topRowDiv = document.createElement('div');
    topRowDiv.classList.add('row');
    const rowDivStyleContainer = document.createElement('div');
    rowDivStyleContainer.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
    rowDivStyleContainer.append(header, paragraphEl, form, paragraphHelp);
    topRowDiv.append(rowDivStyleContainer);

    const containerDiv = document.createElement('section');
    containerDiv.classList.add('container-fluid', 'p-5');
    const rowDiv = document.createElement('div');
    const rowDivFeeds = document.createElement('div');
    // const rowDivPosts = document.createElement('div');
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
    this.element.append(main);
  }
}
