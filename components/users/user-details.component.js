;(async () => {
  const Component = await require('framework/core/component.js');
  const GitHub = await require('services/github.js');
  const Router = await require('framework/core/router.js');
  const Fetch = await require('libs/fetch.js');

  class UserDetailsComponent extends Component {

    onInit() {
      const params = Router.getParams();
      if (params.name) {
        this.name = params.name;

        this.getUser().then(_ => this.update());
      }
    }

    template({ avatar_url, bio, company, email }) {
      return `
      <div>
        <div class="card small">
          <div class="card-image">
            <img src="${avatar_url}">
            <span>${this.name}</span>
          </div>
        </div>
        <div> Bio: ${bio || ''} <div>
        <div> Company: ${company || ''} <div>
        <div> Email: ${email || ''} <div>
      <div>
      <ul class="collection">
        ${this.repos ? this.repos.map(repo => 
          `<li class="collection-item">${repo.name}</li>`).join(''): ''}
      </ul>
        `;
    }

    async getUser() {
      const name = this.name;
      if (name) {
        const result = await GitHub.getUser(name);
        console.log(result)
        this.name = result.login;
        this.data = {...this.data, ...result};
        this.repos = await Fetch.get(result.repos_url);
        console.log(this.repos)
      }
      this.update();
    }

    update() {
      this.setParams();
      super.update();
    }

    setParams() {
      Router.setParam('name', this.name);
    }

  }

  module.exports = UserDetailsComponent;
})();
