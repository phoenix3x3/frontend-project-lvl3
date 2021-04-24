import onChange from 'on-change';

const renderPosts = (currentPosts) => {
  const postsDiv = document.querySelector('.posts');
  const ul1 = document.createElement('ul');
  ul1.classList.add('list-group');
  const headerPosts = document.createElement('h2');
  headerPosts.textContent = 'Посты';
  postsDiv.innerHTML = '';
  currentPosts.forEach((post) => {
    const { postTitle, postDescription, link } = post;
    const newDivElement = document.createElement('li');

    newDivElement.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start'
    );
    const header5 = document.createElement('h5');
    header5.innerHTML = `<a href="${link}">${postTitle}</a>`;
    newDivElement.append(header5);
    ul1.append(newDivElement);
  });
  postsDiv.append(headerPosts, ul1);
};

const addFeed = (state, feed) => {
  const feedsElement = document.querySelector('.feeds');
  const headerFeeds = document.createElement('h2');
  headerFeeds.textContent = 'Фиды';
  const { id, feedTitle, feedDescription } = feed;
  const newAElement = document.createElement('a');
  newAElement.setAttribute('href', '#');
  newAElement.classList.add('list-group-item', 'list-group-item-action');
  const innerDiv = document.createElement('div');
  innerDiv.innerHTML = `<h4 class='mb-1 feedItem'>${feedTitle}</h4>`;
  const newPElement = document.createElement('p');
  newPElement.classList.add('mb-1');
  newPElement.textContent = feedDescription;
  feedsElement.append(headerFeeds, newAElement);

  newAElement.append(innerDiv, newPElement);
};

export default (state) => {
  const input = document.querySelector('.input-rss');
  return onChange(state, (path, value) => {
    // console.log(state);
    // console.log(path);
    switch (path) {
      case 'form.valid':
        if (value) {
          input.classList.remove('is-invalid');
        } else {
          input.classList.add('is-invalid');
        }

        break;
      case 'feeds':
        {
          const feedDivElement = document.querySelector('.feeds');
          feedDivElement.innerHTML = '';
          const { feeds } = state;
          feeds.forEach((feed) => addFeed(state, feed));
        }
        break;

      case 'posts':
        renderPosts(state.posts);
        break;

      default:
        break;
    }
  });
};
