CREATE TABLE
  public.users (
    id serial NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    ws_id character varying(255) NOT NULL UNIQUE,
    last_login timestamp without time zone NOT NULL
  );

ALTER TABLE
  public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id)