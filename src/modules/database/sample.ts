export const ADMIN_ROLE = 'ADMIN';
export const USER_ROLE = 'USER';

export const INIT_PERMISSIONS = [
  {
    name: 'Create User',
    apiPath: '/api/v1/user',
    method: 'POST',
    module: 'Users',
  },
  {
    name: 'Get Users',
    apiPath: '/api/v1/user',
    method: 'GET',
    module: 'Users',
  },
  {
    name: 'Update User',
    apiPath: '/api/v1/user/:id',
    method: 'PATCH',
    module: 'Users',
  },
  {
    name: 'Delete User',
    apiPath: '/api/v1/user/:id',
    method: 'DELETE',
    module: 'Users',
  },
  {
    name: 'Create Role',
    apiPath: '/api/v1/role',
    method: 'POST',
    module: 'Role',
  },
  {
    name: 'Get Roles',
    apiPath: '/api/v1/role',
    method: 'GET',
    module: 'Role',
  },
  {
    name: 'Update Role',
    apiPath: '/api/v1/role/:id',
    method: 'PATCH',
    module: 'Role',
  },
  {
    name: 'Delete Role',
    apiPath: '/api/v1/role/:id',
    method: 'DELETE',
    module: 'Role',
  },
  {
    name: 'Create Permission',
    apiPath: '/api/v1/permission',
    method: 'POST',
    module: 'Permission',
  },
  {
    name: 'Get Permissions',
    apiPath: '/api/v1/permission',
    method: 'GET',
    module: 'Permission',
  },
  {
    name: 'Update Permission',
    apiPath: '/api/v1/permission/:id',
    method: 'PATCH',
    module: 'Permission',
  },
  {
    name: 'Delete Permission',
    apiPath: '/api/v1/permission/:id',
    method: 'DELETE',
    module: 'Permission',
  },
  {
    name: 'Create Contact',
    apiPath: '/api/v1/contact',
    method: 'POST',
    module: 'Contacts',
  },
  {
    name: 'Get Contacts',
    apiPath: '/api/v1/contact',
    method: 'GET',
    module: 'Contacts',
  },
  {
    name: 'Update Contact',
    apiPath: '/api/v1/contact/:id',
    method: 'PATCH',
    module: 'Contacts',
  },
  {
    name: 'Delete Contact',
    apiPath: '/api/v1/contact/:id',
    method: 'DELETE',
    module: 'Contacts',
  },
  {
    name: 'Sign out',
    apiPath: '/api/v1/auth/signout',
    method: 'POST',
    module: 'Auth',
  },
  {
    name: 'Sign in',
    apiPath: '/api/v1/auth/signin',
    method: 'POST',
    module: 'Auth',
  },
  {
    name: 'Sign up',
    apiPath: '/api/v1/auth/signup',
    method: 'POST',
    module: 'Auth',
  },
  {
    name: 'Refresh token',
    apiPath: '/api/v1/auth/refresh',
    method: 'GET',
    module: 'Auth',
  },
  {
    name: 'Get Profile',
    apiPath: '/api/v1/auth/account',
    method: 'GET',
    module: 'Auth',
  },
];
