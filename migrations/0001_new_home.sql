CREATE TABLE IF NOT EXISTS answers (
  id TEXT PRIMARY KEY,
  status TEXT CHECK (status IN ('have', 'need', 'skip')),
  bought INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS custom_items (
  section TEXT NOT NULL,
  name TEXT NOT NULL COLLATE NOCASE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (section, name)
);

CREATE TABLE IF NOT EXISTS login_attempts (
  ip TEXT PRIMARY KEY,
  fails INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
