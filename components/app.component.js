;(async () => {
  const Component = await require('framework/core/component.js');

  class AppComponent extends Component {

    template({names}) {
      return `
      <nav>
        <div class="nav-wrapper">
          <ul class="left hide-on-med-and-down">
            <li><a href="#/users">Users</a></li>
            <li><a href="#/repos">Repos</a></li>
          </ul>
        </div>
      </nav>
      <routing></routing>
      `;
    }
  }

  module.exports = AppComponent;
})();
