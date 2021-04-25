import _ from 'lodash';

export default (xml) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(xml, 'text/xml');
  const id = _.uniqueId();
  const channel = dom.querySelector('channel');
  const feed = {
    id,
    feedTitle: channel.querySelector('title').textContent,
    feedDescription: channel.querySelector('description').textContent,
  };
  const items = channel.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const postObj = {
      id: _.uniqueId(),
      feedId: id,
      postTitle: item.querySelector('title').textContent,
      postDescription: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      isViewed: false,
    };
    posts.push(postObj);
  });

  return { feed, posts };
};
