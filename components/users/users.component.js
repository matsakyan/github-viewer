;(async () => {
  const Component = await require('framework/core/component.js');
  const GitHub = await require('services/github.js');
  const UserComponent = await require('components/users/user.component.js');
  const Router = await require('framework/core/router.js');

  class UsersComponent extends Component {

    onInit() {
      const params = Router.getParams();
      if (params.name) {
        this.searchValue = params.name;
        if (params.page) {
          this.pageNumber = +params.page;
        }

        this.searchUsers(this.pageNumber).then(_ => this.update());
      }
    }

    render() {
      super.render();
      this.searchInput = this.container.querySelector('input');
      this.nextButton = this.container.querySelector('#next');
      this.prevButton = this.container.querySelector('#prev');
      this.searchInput.value = this.searchValue || '';

      const userContainers = this.container.querySelectorAll('user-component');
      userContainers.forEach((userContainer, i) => {
        new UserComponent(userContainer, this.data.users[i]);
      });
    }

    template({ users, searchValue = ''}) {
      return `
        <div class="row">
          <div class="input-field col s6">
            <label for="first_name">User Name</label>
            <input value="${searchValue}" id="user_name" type="text" class="validate">
          </div>
        </div>

        ${ this.pageNumber > 1 ? '<p id="prev"> Prev </p>' : '' }
        ${ !this.isLastPage() ? '<p id="next"> Next </p>' : '' }
      
        ${users ? users.map(user => `<user-component></user-component>`).join(''): ''}
        `;
    }

    addEventListeners() {
      this.searchInput && this.searchInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
          this.searchValue = this.searchInput.value;
          this.searchUsers();
        }
      });

      this.nextButton && this.nextButton.addEventListener('click', () => {
        this.next();
      });

      this.prevButton && this.prevButton.addEventListener('click', () => {
        this.prev();
      });
    }

    async searchUsers(pageNumber = 1) {
      const name = this.searchValue;
      if (name) {
        const result = await GitHub.searchUsers(name, pageNumber);
        this.resultCount = result.total_count;
        this.data.users = result.items;
        this.pageNumber = pageNumber;
      } else {
        this.data.users = [];
        this.resultCount = 0;
        this.pageNumber = null;
      }
      this.update();
    }

    isLastPage() {
      return !this.resultCount || (this.resultCount - 20 * this.pageNumber <= 0);
    }

    async next() {
      await this.searchUsers(this.pageNumber + 1);
    }

    async prev() {
      await this.searchUsers(this.pageNumber - 1);
    }

    update() {
      this.setParams();
      super.update();
    }

    setParams() {
      Router.setParam('name', this.searchValue);
      Router.setParam('page', this.pageNumber);
    }

  }

  module.exports = UsersComponent;
})();
