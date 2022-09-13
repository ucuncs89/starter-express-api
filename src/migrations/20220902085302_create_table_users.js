exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('email', 100).notNullable().unique()
    table.text('password').notNullable()
    table.string('full_name', 100).notNullable()
    table.string('phone_number', 32).nullable()
    table.string('auth_type', 32).notNullable().defaultTo('PERDANA_AUTH')
    table.integer('roles_id').notNullable().defaultTo(1)
    table.boolean('is_active').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
