;(async () => {
  const Component = await require('framework/core/component.js');

  class UserComponent extends Component {

    template({ login, avatar_url}) {
      return `
        <div class="card small">
          <div class="card-image">
            <img src="${avatar_url}">
            <a href="#/user-details?name=${login}">${login}</a>
          </div>
        </div>
        `;
    }
  }

  module.exports = UserComponent;
})();
