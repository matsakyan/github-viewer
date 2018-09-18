module.exports = function (RootComponent, routes) {
  if(!window.location.href.match(/#(.*)$/)) {
    window.location.href += '#/';
  }
  const root = document.getElementById('root');
  new RootComponent(root, {}, routes);
}
