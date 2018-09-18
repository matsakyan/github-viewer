;(async () => {
  const AppComponent = await require('components/app.component.js');
  const bootstrap = await require('framework/core/bootstrap.js')
  const Router = await require('framework/core/router.js');
  const UsersComponent = await require('components/users/users.component.js');
  const ReposComponent = await require('components/repos/repos.component.js');
  const UserDetailsComponent = await require('components/users/user-details.component.js');

  const routes = new Router([
      {href: '/', redirect: '/users'},
      {href: '/users', component: UsersComponent},
      {href: '/repos', component: ReposComponent},
      {href: '/user-details', component: UserDetailsComponent},
    ]);

  bootstrap(AppComponent, routes);

})();
