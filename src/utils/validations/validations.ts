import joi from "joi";

function validate_user() {
  const schema = joi.object({
    username: joi.string().required().lowercase(),
    password: joi.string().required(),
  });
  return schema;
}

function validate_books_filters() {
  const schema = joi.object({
    title: joi.string(),
    category: joi.string(),
    rating: joi.number(),
  });
  return schema;
}

function validate_create_book_data() {
  const schema = joi.object({
    book_id: joi.number().required().min(1001).max(9999),
    title: joi.string().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    published_year: joi.number().required().min(1).max(2022),
    category: joi.string().required(),
    ratings: joi.number().min(1).max(5).required(),
    quantity: joi.number().required(),
    book_cover: joi.string().required(),
  });
  return schema;
}

function validate_update_book_data() {
  const schema = joi.object({
    title: joi.string(),
    author: joi.string(),
    description: joi.string(),
    published_year: joi.number().min(1).max(2022),
    category: joi.string(),
    ratings: joi.number().min(1).max(5),
    quantity: joi.number(),
    book_cover: joi.string(),
  });
  return schema;
}

export {
  validate_user,
  validate_books_filters,
  validate_create_book_data,
  validate_update_book_data,
};
