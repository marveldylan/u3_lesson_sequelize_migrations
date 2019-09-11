# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Create a feature branch
1. Clone

# Sequelize Migrations

```sh
cd sequelize-migrations
npm install
```

Create your database:

```sh
npx sequelize-cli db:create
```

Cool, now let's say you want to add a `username` column to the Users table. How do you do that using [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html)?

```sh
npx sequelize-cli migration:generate --name add-username-to-users --underscored
```

Use the `addColumn` method in the migration:

```sh
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'username',
      Sequelize.INTEGER
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'username');
  }
};
```

Apply the migration:

```sh
npx sequelize-cli db:migrate
```
> If you made a mistake, you can always rollback: npx sequelize-cli db:migrate:undo

Let's make sure the column was added:

```sh
psql sequelize_migrations_development
SELECT * FROM "Users";
```

