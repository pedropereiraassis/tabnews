exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, GitHub limits usernames to 39 characters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    // For reference, 254 it's the maximum length of an email
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    // For reference, 72 it's the maximum length of a bcrypt hash
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    // For reference, always use timestamptz to avoid timezone issues
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    // For reference, always use timestamptz to avoid timezone issues
    updated_at: {
      type: "timestamptz",
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = false;
