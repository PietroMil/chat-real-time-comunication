CREATE TABLE
  public.messages (
    id serial NOT NULL,
    from_user_id integer NOT NULL,
    FOREIGN KEY (from_user_id) REFERENCES users(id),
    to_user_id integer NOT NULL,
    FOREIGN KEY (to_user_id) REFERENCES users(id),
    date timestamp without time zone NOT NULL DEFAULT now(),
    message text NULL
  );

ALTER TABLE
  public.messages
ADD
  CONSTRAINT messages_pkey PRIMARY KEY (id)