-- QARAH — Cloudflare D1 (SQLite) Schema

CREATE TABLE IF NOT EXISTS visits (
  day  TEXT    PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS likes (
  name_key TEXT    NOT NULL,
  name     TEXT    NOT NULL,
  category TEXT    NOT NULL,
  day      TEXT    NOT NULL,
  week     TEXT    NOT NULL,
  month    TEXT    NOT NULL,
  year     TEXT    NOT NULL,
  count    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (name_key, day)
);

CREATE INDEX IF NOT EXISTS idx_likes_name_key ON likes (name_key);
CREATE INDEX IF NOT EXISTS idx_likes_day      ON likes (day);
CREATE INDEX IF NOT EXISTS idx_likes_week     ON likes (week);
CREATE INDEX IF NOT EXISTS idx_likes_month    ON likes (month);
CREATE INDEX IF NOT EXISTS idx_likes_year     ON likes (year);
CREATE INDEX IF NOT EXISTS idx_likes_category ON likes (category);
