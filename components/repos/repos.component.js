;(async () => {
  const Component = await require('framework/core/component.js');

  class ReposComponent extends Component {

    template() {
      return `<div> Repos </div>`;
    }
  }

  module.exports = ReposComponent;
})();
