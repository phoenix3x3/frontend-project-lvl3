import * as yup from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import parse from './parser';
// import updateValidationState from './validation';
import getCorsApiUrl from './corsApiUrl';
import { watchState, checkForNewPosts } from './watchers';
import languages from './languages/languages';

// это должно быть в вотчерах(/отрисовке), закинуть на изменение языка в watchedState

const validate = (currentUrl, addedURLs) =>
  yup.string().url('invalidUrl').required('').notOneOf(addedURLs, 'hasUrlYet').validate(currentUrl);

const app = () => {
  const state = {
    form: {
      processState: 'finished',
      fields: {
        url: '',
      },
      errors: [],
      valid: true,
    },
    language: 'Русский',
    posts: [],
    feeds: [],
    isModalOpen: false,
    selectedPost: {},
  };
  const watchedState = watchState(state);

  const corsApiUrl = getCorsApiUrl();
  const input = document.querySelector('#inputInfo');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'filling';
    watchedState.form.fields.url = e.target.value;
  });
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { url } = watchedState.form.fields;
    const addedURLs = watchedState.feeds.map((feed) => feed.url);
    validate(url, addedURLs)
      .then(() => {
        watchedState.form.errors = [];
        watchedState.form.valid = true;
        const feedback = document.querySelector('.feedback');
        feedback.textContent = 'RSS успешно загружен';
        axios
          .get(`${corsApiUrl}${watchedState.form.fields.url}`)
          .then((res) => {
            if (!watchedState.form.errors.length) {
              const { feed, posts } = parse(res.data);
              const feedWithUrl = { ...feed, url: watchedState.form.fields.url };

              watchedState.posts = [...watchedState.posts, ...posts];
              watchedState.feeds.push(feedWithUrl);
              watchedState.form.processState = 'finished';
              watchedState.form.fields.url = '';
              input.value = '';
            }
            // console.log(feedWithUrl);
          })
          .catch((error) => {
            watchedState.form.errors = ['network'];
            watchedState.form.valid = false;
            watchedState.form.processState = 'filling';
            // console.log(watchedState);
            throw error;
          });
      })
      .catch((err) => {
        watchedState.form.errors = err.errors;
        watchedState.form.valid = false;
      });
  });
  const langs = Object.keys(languages);
  langs.forEach((lang) => {
    const currentButton = document.getElementById(lang);
    currentButton.addEventListener('click', () => {
      watchedState.language = languages[lang];
      i18next.changeLanguage(lang);
    });
  });

  const postsHandler = document.querySelector('.posts');
  postsHandler.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.type !== 'button') return;
    // console.log(e.target.dataset.id);
    const linkElement = e.target.previousElementSibling;
    linkElement.classList.remove('font-weight-bold');
    linkElement.classList.add('font-weight-normal');

    const [post] = watchedState.posts.filter((el) => el.id === e.target.dataset.id);
    const { postTitle, postDescription, link } = post;
    // watchedState.selectedPost = post;
    document.querySelector('.modal-title').textContent = postTitle;
    document.querySelector('.modal-body').textContent = postDescription;
    document.querySelector('.full-article').href = `${link}`;
    document.querySelector('.full-article').textContent = i18next.t('readFull');
    document.querySelector('.btn-close').textContent = i18next.t('btnCloseModal');
  });
  checkForNewPosts(watchedState);
};

export default app;
