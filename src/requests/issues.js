import promise from 'request-promise';
import config from '../config.js';
import queries from '../queries.js';

function Issues() {

  return {
    findRelated: function(term) {

      const options = {
        method: 'POST',
        uri: config.get('github.url'),
        headers: {
          'User-Agent': 'perryworker',
          'Authorization': `bearer ${config.get('github.token')}`
        },
        body: {
          query: queries.issues.related,
          variables: { "term": term }
        },
        json: true
      }

      return promise(options);
    }
  }
}

export default Issues;
