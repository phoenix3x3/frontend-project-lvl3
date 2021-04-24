// import * as yup from 'yup';

// const validate = (currentUrl, addedURLs) =>
//   yup.string().url('invalidUrl').required('').notOneOf(addedURLs, 'hasUrlYet').validate(currentUrl);

// const updateValidationState = (state) => {
//   const { url } = state.form.fields;
//   const addedURLs = state.feeds.map((feed) => feed.url);
//   validate(url, addedURLs)
//     .then(() => {
//       state.form.errors = [];
//       state.form.valid = true;
//     })
//     .catch((err) => {
//       state.form.errors = err.errors;
//       state.form.valid = false;
//     });
// };

// export { updateValidationState };
