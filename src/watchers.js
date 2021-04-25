import onChange from 'on-change';
import i18next from 'i18next';
import _ from 'lodash';
import axios from 'axios';
import getCorsApiUrl from './corsApiUrl';
import parse from './parser';
import resources from './languages';

const corsApiUrl = getCorsApiUrl();

const updateContent = (state) => {
  document.querySelector('h1').textContent = i18next.t('headerRSS');
  document.querySelector('.lead').textContent = i18next.t('paragraphHelp');
  document.querySelector('.addBtn').textContent = i18next.t('addBtn');
  document.querySelector('.paragraphExample').textContent = i18next.t('paragraphExample');
  document.querySelector('#inputInfo').placeholder = i18next.t('inputPlaceholder');
  if (state.feeds.length) {
    document.querySelector('.feeds > h2').textContent = i18next.t('feeds');
    document.querySelector('.posts > h2').textContent = i18next.t('posts');
  }
  if (state.posts.length) {
    const viewBtns = document.querySelectorAll('.btn-view-desc');
    viewBtns.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      element.textContent = i18next.t('btnViewDescription');
    });
  }

  const { errors } = state.form;
  const feedback = document.querySelector('.feedback');
  const errorMessages = errors.map((err) => i18next.t(`errorMessages.${err}`)).join('. ');
  if (errors.length) {
    feedback.textContent = errorMessages;
  } else if (state.feeds.length) {
    feedback.textContent = i18next.t('successLoad');
  }
};

const checkForNewPosts = (state) => {
  setTimeout(checkForNewPosts, 5000, state);
  const { feeds } = state;
  const urls = feeds.map((feed) => feed.url);
  urls.forEach((url) => {
    const corsUrl = `${corsApiUrl}${url}`;
    axios
      .get(corsUrl)
      .then((response) => {
        const { feed, posts } = parse(response.data);
        const { feedTitle } = feed;
        const currentFeed = feeds.find((el) => el.feedTitle === feedTitle);
        const { id } = currentFeed;
        const newPosts = posts.map((post) => ({ ...post, feedId: id }));
        const diffPosts = _.differenceBy(newPosts, state.posts, 'postTitle');
        Array.prototype.push.apply(state.posts, diffPosts);
      })
      .catch((err) => {
        throw err;
      });
  });
};

const renderPosts = (currentPosts) => {
  const postsDiv = document.querySelector('.posts');
  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group');
  const headerPosts = document.createElement('h2');
  headerPosts.textContent = i18next.t('posts');
  postsDiv.innerHTML = ''; // bad
  currentPosts.forEach((post) => {
    const { id, postTitle, link } = post;

    const newLiElement = document.createElement('li');

    newLiElement.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start'
    );
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = postTitle;
    linkElement.setAttribute('data-id', `${id}`);
    linkElement.classList.add('font-weight-bold');

    const btnElement = document.createElement('button');
    btnElement.setAttribute('type', 'button');
    btnElement.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-view-desc');
    btnElement.setAttribute('data-toggle', 'modal');
    btnElement.setAttribute('data-target', '#modal');
    btnElement.setAttribute('data-id', `${id}`);
    btnElement.textContent = i18next.t('btnViewDescription');
    newLiElement.append(linkElement, btnElement);
    ulElement.append(newLiElement);
  });
  postsDiv.append(headerPosts, ulElement);
};

const addFeed = (state, feed) => {
  const feedsElement = document.querySelector('.feedsList');
  // const { id, feedTitle, feedDescription } = feed;
  const { feedTitle, feedDescription } = feed;
  const newAElement = document.createElement('div');
  newAElement.classList.add('list-group-item');
  const innerDiv = document.createElement('div');
  innerDiv.innerHTML = `<h3 class='mb-1 feedItem'>${feedTitle}</h3>`;
  const newPElement = document.createElement('p');
  newPElement.classList.add('mb-1');
  newPElement.textContent = feedDescription;
  feedsElement.append(newAElement);

  newAElement.append(innerDiv, newPElement);
};

const watchState = (state) => {
  i18next
    .init({
      lng: 'ru',
      debug: true,
      resources,
    })
    .then(() => updateContent(state));

  i18next.on('languageChanged', () => updateContent(state));
  const input = document.querySelector('.input-rss');
  return onChange(state, (path, value) => {
    // console.log(path);
    switch (path) {
      case 'form.valid':
        if (value) {
          input.classList.remove('is-invalid');
        } else {
          input.classList.add('is-invalid');
        }

        break;
      case 'form.errors':
        {
          const errorElement = document.querySelector('.feedback');
          const { errors } = state.form;
          if (errorElement) {
            input.classList.remove('is-invalid');
            errorElement.textContent = '';
          }
          if (errors.length === 0) return;
          errorElement.classList.remove('text-success');
          errorElement.classList.add('text-danger');
          const errorMessages = errors.map((err) => i18next.t(`errorMessages.${err}`)).join('. ');

          errorElement.textContent = errorMessages;
          input.classList.add('is-invalid');
        }
        break;
      case 'feeds':
        {
          const feedDivElement = document.querySelector('.feeds');
          const errorsElement = document.querySelector('.feedback');
          const ulElement = document.createElement('ul');
          ulElement.classList.add('list-group', 'mb-5', 'feedsList');
          feedDivElement.innerHTML = '';
          const headerFeeds = document.createElement('h2');
          headerFeeds.textContent = i18next.t('feeds');
          feedDivElement.append(headerFeeds, ulElement);
          const { feeds } = state;
          feeds.forEach((feed) => addFeed(state, feed));
          if (!state.form.errors.length) {
            errorsElement.textContent = i18next.t('successLoad');
            errorsElement.classList.remove('text-danger');
            errorsElement.classList.add('text-success');
          }
        }
        break;
      case 'posts':
        renderPosts(state.posts);
        break;
      case 'language':
        {
          const dropDownBtn = document.querySelector('#dropdownMenuButton');
          dropDownBtn.textContent = state.language;
          updateContent(state);
        }
        break;
      default:
        break;
    }
  });
};

export { watchState, checkForNewPosts };
