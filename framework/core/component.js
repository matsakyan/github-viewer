;(async () => {
  const Router = await require('framework/core/router.js');

  class Component {

    constructor(container, data, routes) {
      if (!container.dataset.ref) {
        this.ref = Math.random();
        Component.refs[this.ref] = this;
        container.dataset.ref = this.ref;
        this.init(container, data, routes);
      } else {
        // If this element has already been instantiated, use the existing reference.
        return Component.refs[container.dataset.ref];
      }
    }

    init(container, data = {}, routes) {
      this.container = container;
      this.routes = routes;
      this.data = data;
      this.onInit();
      this.render();
      this.addEventListeners();
    }

    render() {
      const template = document.createElement('div');
      template.innerHTML = this.template(this.data);
      this.handleRoutes(template);
      this.container.innerHTML = '';
      this.container.appendChild(template);
    }

    template() {
      return '';
    }

    addEventListeners() {}

    onInit() {}

    update() {
      this.render();
      this.addEventListeners();
    }

    handleRoutes(template) {
      if (this.routes) {
        const href = Router.getHref();
        let route = this.routes.get(href);
        if (route) {
          if (route.redirect) {
            Router.navigate(route.redirect);
            route = this.routes.get(route.redirect);
          } 
          const routing = template.querySelector('routing');
          const RoutingComponent = route.component;
          new RoutingComponent(routing);
          window.addEventListener('popstate', () => {
            this.update();
          });
        }
      }
    }

  }

  Component.refs = {};

  module.exports = Component;
})();
