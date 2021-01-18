DROP TABLE IF EXISTS tenancies CASCADE;

CREATE TABLE tenancies(
  id SERIAL PRIMARY KEY NOT NULL,
  -- move_in_date DATE NOT NULL,
  -- move_out_date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE
);