# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Sequelize Migrations

> Take five minutes and read the Sequelize docs on migrations: 
>
> - https://sequelize.org/master/manual/migrations.html

##

Let's go into the repo:

```sh
cd sequelize-migrations
npm install
```

Create your database:

```sh
npx sequelize-cli db:create
```

Take a moment to look at the User model that already exists in your codebase:

models/user.js
```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
```

Notice how there is no userName attribute, what if we wanted to add `userName` to the User model? How do we use [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html) to do this?

```sh
npx sequelize-cli migration:generate --name add-userName-to-users
```
> Want to know more about generating migrations using the Sequelize CLI? Run `npx sequelize-cli migration:generate --help`

Use the `addColumn` method in the migration:

```sh
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'userName',
      Sequelize.STRING
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'userName');
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

Oh no! I made a mistake! I wanted `username` not `userName` as the column name. How do I rename an already existing column using migrations?

```sh
npx sequelize-cli migration:generate --name rename-userName-to-username
```

And write the following code in your migration:

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'userName', 'username');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'username', 'userName');
  }
};
```

Run it!

```sh
npx sequelize-cli db:migrate
```

Make sure the change was applied:

```sh
psql sequelize_migrations_development
SELECT * FROM "Users";
```

Cool. So now you have one last change you'd like to make to your database. You want to have `email` be required (no nulls). That means we need to create a migration to change our already existing `email` column to not allow nulls.

```sh
npx sequelize-cli migration:generate --name change-email-to-not-allow-nulls
```

Here is the code using the sequelize `changeColumn` method:

```sh
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  }
};
```

Apply the changes:

```sh
npx sequelize-cli db:migrate
```

Test it out:

```sql
psql sequelize_migrations_development
INSERT INTO "Users" VALUES (2, 'Bruno', 'Galvao');
```

The result should be `null value in column "email" violates not-null constraint`. Awesome.
> Want to successfully `INSERT`? Try `INSERT INTO "Users" VALUES (Default, 'Bruno', 'Galvao', 'bruno@bruno.com', 'STRONG', now(), now(), 'bruno');`

## Conclusion

There are [several other methods available](https://sequelize.readthedocs.io/en/latest/docs/migrations/#changecolumntablename-attributename-datatypeoroptions-options) to you e.g. `dropAllTables()`, `renameTable()`, and `removeColumn()` to name a few.


## Resources

- https://sequelize.readthedocs.io/en/latest/docs/migrations/#changecolumntablename-attributename-datatypeoroptions-options
- https://sequelize.org/master/manual/migrations.html
