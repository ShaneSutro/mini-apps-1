USE checkout;

drop table users;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(150),
  email VARCHAR(150),
  pass VARCHAR(150),
  address1 VARCHAR(150),
  address2 VARCHAR(150),
  city VARCHAR(150),
  state VARCHAR(150),
  zip VARCHAR(150),
  phoneNumber VARCHAR(150),
  cc VARCHAR(150),
  expires VARCHAR(150),
  cvv VARCHAR(150),
  billingZip VARCHAR(150),
  primary key (id)
)