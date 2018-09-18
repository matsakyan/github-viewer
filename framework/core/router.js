class Router {
  constructor(routes) {
    this.routes = routes.reduce((map, route) => {
      map.set(route.href, route);
      return map;
    }, new Map());
  }

  get(href) {
    return this.routes.get(href);
  }

  static getHref() {
    const match = window.location.href.match(/#(.*)$/);
    const href = match ? match[1] : '';
    const index = href.indexOf('?');
    return index > -1 ? href.substring(0, index): href;
  }

  static getParams() {
    const match = window.location.href.match(/\?(.*)$/);
    const paramsString = match ? match[1] : '';
    const params = paramsString.split('&').filter(param => param);
    return params.reduce((obj, param) => {
      const keyValue = param.split('=');
      obj[keyValue[0]] = keyValue[1];
      return obj;
    }, {});
  }

  static setParam(key, value) {
    const params = Router.getParams();
    if (value) {
      params[key] = value;
    } else {
      delete params[key];
    }

    const paramsString = Object.keys(params)
      .map(key => `${key}=${params[key]}`).join('&');

    let href = window.location.href;
    const index = href.indexOf('?');
    href = index > -1 ? href.substring(0, index): href;
    if (paramsString.length) {
      href += '?' + paramsString;
    }

    window.history.pushState(null, null, href);
  }

  static navigate(path) {
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
  }
}

module.exports = Router;
