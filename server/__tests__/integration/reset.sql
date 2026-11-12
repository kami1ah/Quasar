TRUNCATE user_account RESTART IDENTITY;

INSERT INTO user_account(user_id, username, password, age, school)
VALUES
(1, 'username1', 'password1', '2008-09-25', 'User1 School'),
(2, 'username2', 'password2', '2015-05-15', 'User2 School'),
(3, 'username3', 'password3', '2019-05-07', 'User3 School');


TRUNCATE question RESTART IDENTITY;

INSERT INTO question(question_id, image_url, answer, category, description)
VALUES
(1, 'image_url1', 'answer1', 'category1', 'description1'),
(2, 'image_url2', 'answer2', 'category2', 'description2'),
(3, 'image_url3', 'answer3', 'category3', 'description3');


TRUNCATE hints RESTART IDENTITY;

INSERT INTO hints(hint_id, question_id, hint_order, hint_text)
VALUES
(1, 2, 3, 'hinttext1'),
(2, 4, 5, 'hinttext2'),
(3, 6, 7, 'hinttext3');


