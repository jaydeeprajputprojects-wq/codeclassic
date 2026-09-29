CREATE TABLE IF NOT EXISTS app_metadata (
    key VARCHAR(100) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);

INSERT INTO app_metadata (key, value)
VALUES ('schema', 'baseline')
ON CONFLICT (key) DO NOTHING;
