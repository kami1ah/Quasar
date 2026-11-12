
-- Reset all tables and their identity counters
TRUNCATE TABLE
    user_game_stats,
    user_account,
    hints,
    questions
RESTART IDENTITY;

-- Insert test users
INSERT INTO user_account (username, password, age, school)
VALUES
    ('username1', 'password1', '2008-09-25', 'User1 School'),
    ('username2', 'password2', '2015-05-15', 'User2 School'),
    ('username3', 'password3', '2019-05-07', 'User3 School');

-- Insert questions
INSERT INTO questions (image_url, answer, category, description)
VALUES
    ('image_url1', 'answer1', 'category1', 'description1'),
    ('image_url2', 'answer2', 'category2', 'description2'),
    ('image_url3', 'answer3', 'category3', 'description3');

-- Insert hints
INSERT INTO hints (question_id, hint_order, hint_text)
VALUES
    (1, 1, 'hinttext1'),
    (2, 2, 'hinttext2'),
    (3, 3, 'hinttext3');
