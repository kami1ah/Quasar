DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS hints CASCADE;

CREATE TABLE user_account (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    age DATE NOT NULL,
    school VARCHAR(100),
    points INTEGER
);

CREATE TABLE questions (
    question_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    image_url TEXT NOT NULL,
    answer VARCHAR(100) NOT NULL,
    category VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE hints (
    hint_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_id INTEGER NOT NULL,
    hint_order INTEGER NOT NULL,
    hint_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);



INSERT INTO questions (image_url, answer, category, description) VALUES

-- Figures
('https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg/1280px-Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
'Isaac Newton', 'Figures',
'An English mathematician and physicist whose discoveries transformed our understanding of the natural world. His work on gravity and the laws of motion laid the foundations for classical physics.'),

('https://upload.wikimedia.org/wikipedia/commons/2/21/William_Shakespeare_by_John_Taylor%2C_edited.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'William Shakespeare', 'Figures',
'An English playwright and poet widely regarded as one of the greatest writers in the English language. His plays and poems have had a lasting influence on literature, theatre and storytelling.'),

('https://upload.wikimedia.org/wikipedia/commons/2/28/Albert_Einstein_Head_cleaned.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'Albert Einstein', 'Figures',
'A theoretical physicist whose groundbreaking ideas changed how scientists understand space, time and energy. His theory of relativity revolutionised modern physics.'),

('https://upload.wikimedia.org/wikipedia/commons/a/af/Darnley_stage_3.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'Elizabeth I', 'Figures',
'One of England''s most influential monarchs, whose reign marked a period of significant cultural and political development. Her leadership helped establish England as a major European power.'),

('https://www.leonardodavinci.net/assets/img/leonardo-da-vinci.jpg',
'Leonardo da Vinci', 'Figures',
'An Italian artist, inventor and scientist who became one of the leading figures of the Renaissance. His work combined art, engineering and scientific investigation.'),

-- Monuments
('https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=800',
'Eiffel Tower', 'Monuments',
'One of the most recognisable structures in the world and a defining symbol of its capital city. Originally constructed for an international exhibition in the 19th century, it has become a major landmark.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Colosseo_2020.jpg?width=800',
'Colosseum', 'Monuments',
'An enormous ancient amphitheatre built during the Roman Empire. It hosted gladiatorial contests and public spectacles, providing insight into Roman entertainment, architecture and society.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_(Edited).jpeg?width=800',
'Taj Mahal', 'Monuments',
'A magnificent mausoleum commissioned by a Mughal emperor in memory of his wife. Famous for its white marble architecture, it is considered one of the finest examples of Mughal architecture.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Stonehenge2007_07_30.jpg?width=800',
'Stonehenge', 'Monuments',
'A prehistoric monument consisting of a circular arrangement of enormous standing stones. Its construction demonstrates the engineering capabilities of ancient communities and its original purpose remains debated.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_Liberty_7.jpg?width=800',
'Statue of Liberty', 'Monuments',
'A monumental sculpture gifted by France to the United States as a symbol of friendship and freedom. It has become an internationally recognised representation of liberty and democracy.'),

-- Geography
('https://commons.wikimedia.org/wiki/Special:FilePath/Everest_kalapatthar.jpg?width=800',
'Mount Everest', 'Geography',
'The highest mountain on Earth above sea level. Located within the Himalayas, it has become a major destination for mountaineers and represents one of the greatest challenges in high-altitude climbing.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_view_from_Pima_Point_2010.jpg?width=800',
'Grand Canyon', 'Geography',
'A vast natural canyon formed through millions of years of erosion. Its enormous scale and exposed rock layers provide valuable evidence of geological history.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/3Falls_Niagara.jpg?width=800',
'Niagara Falls', 'Geography',
'A collection of three powerful waterfalls located along the border between Canada and the United States. Famous for their impressive volume of flowing water, they are also an important source of hydroelectric power.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/Uluru_(Helicopter_view)-crop.jpg?width=800',
'Uluru', 'Geography',
'A massive sandstone formation rising dramatically from the Australian desert. It holds deep spiritual and cultural significance for the Indigenous Anangu people.'),

('https://commons.wikimedia.org/wiki/Special:FilePath/MtFuji_FujiCity.jpg?width=800',
'Mount Fuji', 'Geography',
'A prominent volcanic mountain that has become one of the most recognisable natural symbols of Japan. It has significant cultural and spiritual importance and has inspired artists and writers for centuries.');
 
-- Hints (4 per question, vaguest first)
INSERT INTO hints (question_id, hint_order, hint_text) VALUES
-- Isaac Newton
(1, 1, 'This person was an English scientist.'),
(1, 2, 'He lived in the 1600s and 1700s.'),
(1, 3, 'He wrote the three laws of motion.'),
(1, 4, 'A falling apple is said to have inspired his theory of gravity.'),
-- William Shakespeare
(2, 1, 'This person was a writer.'),
(2, 2, 'He was born in Stratford-upon-Avon.'),
(2, 3, 'His plays were performed at the Globe Theatre.'),
(2, 4, 'He wrote Romeo and Juliet.'),
-- Albert Einstein
(3, 1, 'This person was a physicist.'),
(3, 2, 'He was born in Germany in 1879.'),
(3, 3, 'He won the Nobel Prize in Physics in 1921.'),
(3, 4, 'He is famous for the equation E = mc squared.'),
-- Elizabeth I
(4, 1, 'This person was a monarch.'),
(4, 2, 'She was the last ruler of the Tudor dynasty.'),
(4, 3, 'Her navy defeated the Spanish Armada in 1588.'),
(4, 4, 'She was known as the Virgin Queen.'),
-- Leonardo da Vinci
(5, 1, 'This person was born in Italy.'),
(5, 2, 'He lived during the Renaissance.'),
(5, 3, 'He sketched designs for flying machines.'),
(5, 4, 'He painted the Mona Lisa.'),
-- Eiffel Tower
(6, 1, 'This monument is in Europe.'),
(6, 2, 'It is made of iron.'),
(6, 3, 'It was built for the 1889 World''s Fair.'),
(6, 4, 'It stands in Paris.'),
-- Colosseum
(7, 1, 'This monument is nearly 2,000 years old.'),
(7, 2, 'It is an amphitheatre.'),
(7, 3, 'Gladiators once fought here.'),
(7, 4, 'It is in Rome.'),
-- Taj Mahal
(8, 1, 'This monument is in Asia.'),
(8, 2, 'It is made of white marble.'),
(8, 3, 'An emperor built it in memory of his wife.'),
(8, 4, 'It is in Agra, India.'),
-- Stonehenge
(9, 1, 'This monument is in the UK.'),
(9, 2, 'It is thousands of years old.'),
(9, 3, 'It is a ring of huge standing stones.'),
(9, 4, 'It is in Wiltshire, on Salisbury Plain.'),
-- Statue of Liberty
(10, 1, 'This monument is in North America.'),
(10, 2, 'It was a gift from France.'),
(10, 3, 'It holds a torch in one hand.'),
(10, 4, 'It stands in New York Harbor.'),
-- Mount Everest
(11, 1, 'This place is in Asia.'),
(11, 2, 'It sits on the border of Nepal and China.'),
(11, 3, 'It is part of the Himalayas.'),
(11, 4, 'It is the highest mountain on Earth.'),
-- Grand Canyon
(12, 1, 'This place is in North America.'),
(12, 2, 'It was carved over millions of years.'),
(12, 3, 'The Colorado River runs through it.'),
(12, 4, 'It is in Arizona.'),
-- Niagara Falls
(13, 1, 'This place is in North America.'),
(13, 2, 'It is made up of three waterfalls.'),
(13, 3, 'It sits on the border of two countries.'),
(13, 4, 'It lies between Canada and New York State.'),
-- Uluru
(14, 1, 'This place is in the Southern Hemisphere.'),
(14, 2, 'It is a giant sandstone rock formation.'),
(14, 3, 'It is sacred to the Anangu people.'),
(14, 4, 'It is also known as Ayers Rock.'),
-- Mount Fuji
(15, 1, 'This place is in Asia.'),
(15, 2, 'It is an active volcano.'),
(15, 3, 'It is the tallest mountain in its country.'),
(15, 4, 'It is in Japan.');
 