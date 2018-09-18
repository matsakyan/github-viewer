class Fetch {
  static async request(url, method = 'GET', headers = {}, data) {

    try {

      const options = {
        method,
        headers: Object.assign({
          'Content-Type': 'application/json',
        }, headers),
      };

      if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      const status = response.status;

      let result;

      try {
        result = await response.json();
      } catch(err) {
        return {
          success: false,
          errorMessage: 'Something went wrong',
        }
      }

      if (status >= 200 && status < 300) {
        // TODO ::: Use response.ok
        return (result && (result.success = true), result);
      } else {
        return {
          status: status,
          success: false,
          errorMessage: result.errorMessage,
        }
      }

    } catch (error) {
      console.error(error); // TODO ::: Implement ErrorHandler
      return {
        error,
        success: false,
      }
    }
  }

  static async get(url, headers = {}) {
    return await Fetch.request(
      url,
      'GET',
      headers,
    );
  }

  static async post(url, headers = {}, data) {
    return await Fetch.request(
      url,
      'POST',
      headers,
      data,
    );
  }
}

module.exports = Fetch;
