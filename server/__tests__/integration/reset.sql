
-- Reset all tables and their identity counters
TRUNCATE TABLE
    user_account,
    user_game_stats,
    questions,
    hints

RESTART IDENTITY;

-- Insert test users
INSERT INTO user_account (username, password, age, school)
VALUES
    ('username1', 'password1', '2008-09-25', 'User1 School'),
    ('username2', 'password2', '2015-05-15', 'User2 School'),
    ('username3', 'password3', '2019-05-07', 'User3 School');

-- Insert user_game_stats
INSERT INTO user_game_stats (user_id,
    historical_figures_points, monuments_points, geography_points, 
    historical_figures_games, monuments_games, geography_games)
VALUES
    -- ('historical_figures_points', 29),
    -- ('monuments_points', 34),
    -- ('geography_points', 87),
    -- ('total_points', 3726),
    -- ('historical_figures_games', 623),
    -- ('monuments_games', 363),
    -- ('geography_games', 774),
    -- ('total_games', 9475);
    (1, 29, 34, 87, 623, 363, 774);

-- Insert questions
INSERT INTO questions (image_url, answer, category, description)
VALUES
    ('image_url1', 'answer1', 'category1', 'description1'),
    ('image_url2', 'answer2', 'category2', 'description2'),
    ('image_url3', 'answer3', 'category3', 'description3');


