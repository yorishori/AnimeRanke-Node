PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: nyanAnimes
CREATE TABLE nyanAnimes (
    AnimeId  INTEGER PRIMARY KEY AUTOINCREMENT,
    Title    TEXT,
    CoverUrl TEXT,
    TraktUrl TEXT,
    SaveId   INTEGER REFERENCES nyanSaves (SaveId) ON DELETE CASCADE
                                                   ON UPDATE CASCADE
);


-- Table: nyanSaves
CREATE TABLE nyanSaves (
    SaveId        INTEGER PRIMARY KEY AUTOINCREMENT,
    FileName      TEXT,
    SaveName      TEXT,
    TreeJson      TEXT,
    RemainingJson TEXT
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
