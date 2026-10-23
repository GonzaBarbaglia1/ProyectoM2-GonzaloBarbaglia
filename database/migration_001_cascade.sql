-- Migración 001
-- Actualiza la relación entre posts y authors
-- para eliminar las publicaciones cuando se elimina su autor.

BEGIN;

ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

ALTER TABLE posts
ADD CONSTRAINT posts_author_id_fkey
FOREIGN KEY (author_id)
REFERENCES authors(id)
ON DELETE CASCADE;

COMMIT;