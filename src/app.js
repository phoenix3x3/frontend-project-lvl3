import axios from 'axios';
import watchState from './watchers';
import parse from './parser';
import updateValidationState from './validation';
import getCorsApiUrl from './corsApiUrl';

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
    posts: [],
    feeds: [],
  };
  const watchedState = watchState(state);
  const corsApiUrl = getCorsApiUrl();
  const input = document.querySelector('input[id="inputInfo"]');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'filling';
    watchedState.form.fields.url = e.target.value;
  });
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateValidationState(watchedState);
    axios
      .get(`${corsApiUrl}${watchedState.form.fields.url}`)
      .then((res) => {
        const { feed, posts } = parse(res.data);
        const feedWithUrl = { ...feed, url: watchedState.form.fields.url };
        watchedState.posts = [...watchedState.posts, ...posts];
        watchedState.feeds.push(feedWithUrl);
        watchedState.form.processState = 'finished';
        watchedState.form.fields.url = '';
        // console.log(feedWithUrl);
      })
      .catch((error) => {
        watchedState.form.errors = ['network'];
        watchedState.form.valid = false;
        watchedState.form.processState = 'filling';
        // console.log(watchedState);
        throw error;
      });
  });
};

export default app;
