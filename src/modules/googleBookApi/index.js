import https from 'https';
import querystring from 'querystring';
import { pick, find } from 'lodash';

// https://developers.google.com/books/docs/v1/using#st_params
const defaultOptions = {
  // Google API key
  key: null,
  // Search in a specified field
  field: null,
  // The position in the collection at which to start the list of results (startIndex)
  offset: 0,
  // The maximum number of elements to return with this request (Max 40) (maxResults)
  limit: 10,
  // Restrict results to books or magazines (or both) (printType)
  type: 'all',
  // Order results by relevance or newest (orderBy)
  order: 'relevance',
  // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
  lang: 'en',
  //projection: 'full',
};

// Special Keywords
const fields = {
  title: 'intitle:',
  author: 'inauthor:',
  publisher: 'inpublisher:',
  subject: 'subject:',
  isbn: 'isbn:',
};

// Base url for Google Books API
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?';

/**
 * Search Google Books
 *
 * @param {String} _query Search term
 * @param {Object} _options Search options
 */
const search = (_query, _options = {}) => {
  const options = { ...defaultOptions, ..._options };

  let query;
  // Set any special keywords
  if (options.field) {
    query = fields[options.field] + _query;
  } else {
    query = _query;
  }

  // Create the request uri
  const queryUrl = {
    q: query,
    startIndex: options.offset,
    maxResults: options.limit,
    printType: options.type,
    orderBy: options.order,
    langRestrict: options.lang,
  };

  if (options.key) {
    queryUrl.key = options.key;
  }

  const uri = baseUrl + querystring.stringify(queryUrl);

  return new Promise(((resolve, reject) => {
    // Validate options
    if (!query) {
      reject(new Error('Query is required'));
      return;
    }

    if (options.offset < 0) {
      reject(new Error('Offset cannot be below 0'));
      return;
    }

    if (options.limit < 1 || options.limit > 40) {
      reject(new Error('Limit must be between 1 and 40'));
      return;
    }

    // TODO: REPLACE https by superagent
    // Send Request
    https.get(uri, (response) => {
      if (response.statusCode && response.statusCode === 200) {
        let body = '';
        response.on('data', (data) => {
          body += data;
        });

        response.on('end', () => {
          // Parse response body
          const data = JSON.parse(body);

          const { totalItems } = data;

          // Array of JSON results to return
          const results = [];

          // Extract useful data
          if (data.items) {
            for (let i = 0; i < data.items.length; i++) {
              const item = data.items[i];
              const book = item.volumeInfo;
              let push = {};

              push = pick(book, [
                'title',
                'authors',
                'publisher',
                'publishedDate',
                'pageCount',
                'printType',
                'categories',
                'language',
                'infoLink',
                'description',
                'averageRating',
                'ratingsCount',
                'previewLink',
              ]);

              // Thumbnail
              if (book.imageLinks && book.imageLinks.thumbnail) {
                push.thumbnail = book.imageLinks.thumbnail;
              }

              // ISBN
              if (book.industryIdentifiers && book.industryIdentifiers.length > 0) {
                const isbn13 = find(book.industryIdentifiers, item => item.type === 'ISBN_13', 'identifier');

                if (isbn13) // try to get isbn13
                { push.isbn = isbn13; } else { push.isbn = book.industryIdentifiers[0].identifier; }
              }

              push.id = item.id;

              results.push(push);
            }
          }

          return resolve({ results, totalItems });
        });
      } else {
        return reject(`Status Code: ${response.statusCode}`);
      }
    }).on('error', error => reject(error));
  }));
};

export {
  search
};
