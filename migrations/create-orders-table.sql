CREATE TABLE orders (
	id serial PRIMARY KEY,
	item text,
	qty int,
	create_at timestamptz NOT NULL DEFAULT now()
);
