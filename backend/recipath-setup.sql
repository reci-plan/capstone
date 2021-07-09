\echo 'Delete and recreate recipath db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE recipath;
CREATE DATABASE recipath;
\connect recipath

\i recipath-schema.sql
