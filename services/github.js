;(async () => {
  const Fetch = await require('libs/fetch.js');

  class GitHub {

    static async get(path, params = {}) {
      const url = new URL(GitHub.API + path);
      url.search = new URLSearchParams(params);
      return await Fetch.get(url, GitHub.headers);
    }

    static async searchUsers(name, page) {
      const params = {
        q: `${name} in:login`,
        per_page: 20,
        page,
      };
      const path = '/search/users';
      return await GitHub.get(path, params);
    }

    static async getUser(name) {
      const path = `/users/${name}`;
      return await GitHub.get(path);
    }
  }

  GitHub.headers = {
      Accept: 'application/vnd.github.v3+json'
    };

  GitHub.API = 'https://api.github.com';

  module.exports = GitHub; 
})();
