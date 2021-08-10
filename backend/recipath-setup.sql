\echo 'Delete and recreate recipath db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE recipath;
CREATE DATABASE recipath;
\connect recipath

\i recipath-schema.sql

\echo 'DELETE and recreate recipath_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE recipath_test;
CREATE DATABASE recipath_test;
\connect recipath_test

\i kavholm-schema.sql