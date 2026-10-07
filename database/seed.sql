INSERT INTO authors (name, apellido, email, bio) VALUES
('Ana', 'García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
('Carlos', 'Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
('María', 'López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT
    'Introducción a Node.js',
    'Node.js es un runtime de JavaScript...',
    id,
    true
FROM authors
WHERE email = 'ana@example.com'
AND NOT EXISTS (
    SELECT 1 FROM posts WHERE title = 'Introducción a Node.js'
);

INSERT INTO posts (title, content, author_id, published)
SELECT
    'PostgreSQL vs MySQL',
    'Ambas bases de datos tienen ventajas...',
    id,
    true
FROM authors
WHERE email = 'carlos@example.com'
AND NOT EXISTS (
    SELECT 1 FROM posts WHERE title = 'PostgreSQL vs MySQL'
);

INSERT INTO posts (title, content, author_id, published)
SELECT
    'APIs RESTful',
    'REST es un estilo arquitectónico...',
    id,
    true
FROM authors
WHERE email = 'ana@example.com'
AND NOT EXISTS (
    SELECT 1 FROM posts WHERE title = 'APIs RESTful'
);

INSERT INTO posts (title, content, author_id, published)
SELECT
    'Manejo de errores en Express',
    'El manejo apropiado de errores...',
    id,
    false
FROM authors
WHERE email = 'maria@example.com'
AND NOT EXISTS (
    SELECT 1 FROM posts WHERE title = 'Manejo de errores en Express'
);

INSERT INTO posts (title, content, author_id, published)
SELECT
    'Async/Await explicado',
    'Las promesas simplifican el código asíncrono...',
    id,
    false
FROM authors
WHERE email = 'ana@example.com'
AND NOT EXISTS (
    SELECT 1 FROM posts WHERE title = 'Async/Await explicado'
);