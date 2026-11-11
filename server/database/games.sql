DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS hints CASCADE;
DROP TABLE IF EXISTS user_game_stats CASCADE;

CREATE TABLE user_account (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    age DATE NOT NULL,
    school VARCHAR(100)

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

CREATE TABLE user_game_stats (
    user_id INTEGER PRIMARY KEY,

    historical_figures_points INTEGER DEFAULT 0,
    monuments_points INTEGER DEFAULT 0,
    geography_points INTEGER DEFAULT 0,

    total_points INTEGER GENERATED ALWAYS AS (
        historical_figures_points +
        monuments_points +
        geography_points
    ) STORED,

    historical_figures_games INTEGER DEFAULT 0,
    monuments_games INTEGER DEFAULT 0,
    geography_games INTEGER DEFAULT 0,

    total_games INTEGER GENERATED ALWAYS AS (
        historical_figures_games +
        monuments_games +
        geography_games
    ) STORED,

    FOREIGN KEY (user_id)
        REFERENCES user_account(user_id)
        ON DELETE CASCADE
);



INSERT INTO questions (image_url, answer, category, description) VALUES

-- ==========================================
-- HISTORICAL FIGURES
-- ==========================================

(
'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg/1280px-Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
'Isaac Newton',
'Figures',
'Isaac Newton (1643–1727) was an English mathematician, physicist and astronomer who is widely regarded as one of the most influential scientists in history. He developed the three laws of motion, which explain how objects move and interact with forces, and formulated the law of universal gravitation, explaining how objects attract one another. His groundbreaking work was published in his famous book Principia Mathematica in 1687. Newton also made important contributions to mathematics, particularly the development of calculus, and conducted pioneering experiments with light and colour. His discoveries transformed scientific understanding and laid the foundations for classical mechanics.'
),

(
'https://upload.wikimedia.org/wikipedia/commons/2/21/William_Shakespeare_by_John_Taylor%2C_edited.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'William Shakespeare',
'Figures',
'William Shakespeare (1564–1616) was an English playwright, poet and actor who is widely considered one of the greatest writers in the English language. Born in Stratford-upon-Avon, he became famous for writing plays that explored human emotions, relationships, ambition, power and tragedy. Some of his most celebrated works include Romeo and Juliet, Hamlet, Macbeth and Othello. Shakespeare was associated with the Lord Chamberlain''s Men, a theatre company that performed many of his plays at the Globe Theatre in London. His writing has influenced literature, theatre and popular culture across the world, with his works still performed and studied more than 400 years after his death.'
),

(
'https://upload.wikimedia.org/wikipedia/commons/2/28/Albert_Einstein_Head_cleaned.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'Albert Einstein',
'Figures',
'Albert Einstein (1879–1955) was a German-born theoretical physicist who fundamentally changed how scientists understand the universe. He is best known for developing the theory of relativity, which transformed our understanding of space, time, gravity and energy. His famous equation, E = mc², demonstrated the relationship between mass and energy and became one of the most recognisable equations in science. In 1921, he was awarded the Nobel Prize in Physics for his explanation of the photoelectric effect, which helped advance the development of quantum physics. His discoveries had a lasting impact on modern science and continue to influence research in physics and astronomy.'
),

(
'https://upload.wikimedia.org/wikipedia/commons/a/af/Darnley_stage_3.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
'Elizabeth I',
'Figures',
'Elizabeth I (1533–1603) was Queen of England and Ireland from 1558 until her death, ruling for 44 years during a period often referred to as the Elizabethan Age. Her reign saw significant developments in English literature, exploration, trade and the arts, including the flourishing of William Shakespeare''s theatre. One of the most important events of her rule was the defeat of the Spanish Armada in 1588, which prevented a major attempted invasion of England. She also maintained England''s independence from powerful European rivals and established a Protestant religious settlement. Her leadership and long reign helped shape England''s political and cultural identity.'
),

(
'https://www.leonardodavinci.net/assets/img/leonardo-da-vinci.jpg',
'Leonardo da Vinci',
'Figures',
'Leonardo da Vinci (1452–1519) was an Italian artist, inventor, engineer and scientist who became one of the most celebrated figures of the Renaissance. He is best known for painting masterpieces such as the Mona Lisa and The Last Supper, which are admired for their artistic techniques and attention to detail. However, his interests extended far beyond painting, as he studied human anatomy, mathematics, architecture, engineering and the natural world. His notebooks contained detailed sketches of inventions, including flying machines, bridges and military devices, many of which were far ahead of their time. Leonardo represents the Renaissance ideal of combining artistic creativity with scientific curiosity and remains an enduring symbol of innovation and human achievement.'
),

-- ==========================================
-- MONUMENTS
-- ==========================================

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=800',
'Eiffel Tower',
'Monuments',
'The Eiffel Tower is an iconic iron structure located in Paris, France, and is one of the most recognisable landmarks in the world. It was designed by engineer Gustave Eiffel and his company, and completed in 1889 for the Exposition Universelle, a world fair celebrating the 100th anniversary of the French Revolution. Standing approximately 330 metres tall, it was the tallest man-made structure in the world when it was completed, holding that record for over 40 years. Although initially criticised by some artists and writers, it eventually became a symbol of French engineering, innovation and national identity. Today, millions of visitors travel to Paris each year to experience its observation platforms and spectacular views of the city.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Colosseo_2020.jpg?width=800',
'Colosseum',
'Monuments',
'The Colosseum is an enormous ancient amphitheatre located in the centre of Rome, Italy. Construction began under Emperor Vespasian around AD 70 and was completed under his successor Titus in AD 80. It could accommodate tens of thousands of spectators who gathered to watch gladiatorial contests, animal hunts and other public spectacles. The structure demonstrates the remarkable engineering abilities of the Roman Empire, incorporating complex systems of arches, entrances and underground chambers. Despite suffering damage from earthquakes and the removal of stone over centuries, much of the structure remains standing today. It is one of the most important surviving examples of Roman architecture and a powerful symbol of the ancient Roman civilisation.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_(Edited).jpeg?width=800',
'Taj Mahal',
'Monuments',
'The Taj Mahal is a magnificent white marble mausoleum located in Agra, India. It was commissioned by the Mughal emperor Shah Jahan in 1632 in memory of his wife Mumtaz Mahal, who died during childbirth in 1631. Construction took more than 20 years and involved thousands of workers, architects and craftsmen. The building combines elements of Islamic, Persian, Ottoman and Indian architectural styles, featuring intricate marble carvings, decorative gemstones and a large central dome. It is widely regarded as one of the finest examples of Mughal architecture and is recognised as a UNESCO World Heritage Site. Today, it is celebrated around the world as a symbol of love, artistic achievement and India''s rich cultural heritage.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Stonehenge2007_07_30.jpg?width=800',
'Stonehenge',
'Monuments',
'Stonehenge is a prehistoric monument located on Salisbury Plain in Wiltshire, England. Its construction began approximately 5,000 years ago, with the enormous standing stones added in later stages over several centuries. Some of the stones weigh several tonnes and were transported considerable distances, demonstrating the organisation and engineering capabilities of prehistoric communities. Archaeologists believe the site had important ceremonial and religious purposes, although its exact function remains uncertain. Its alignment with the movements of the Sun, particularly during the summer and winter solstices, suggests that it may also have been used to track seasonal changes. Today, Stonehenge is one of Britain''s most famous historical landmarks and a UNESCO World Heritage Site.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_Liberty_7.jpg?width=800',
'Statue of Liberty',
'Monuments',
'The Statue of Liberty is a monumental sculpture located on Liberty Island in New York Harbor, United States. It was a gift from France to the American people to celebrate the friendship between the two nations and commemorate the American Revolution. Designed by French sculptor Frédéric Auguste Bartholdi, the statue was dedicated in 1886. It depicts a woman holding a torch above her head and a tablet inscribed with the date of American independence. Standing approximately 93 metres tall from the ground to the tip of its torch, it became an important symbol of freedom, democracy and opportunity. For millions of immigrants arriving in America by sea, it represented hope and the possibility of a new beginning.'
),

-- ==========================================
-- GEOGRAPHY
-- ==========================================

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Everest_kalapatthar.jpg?width=800',
'Mount Everest',
'Geography',
'Mount Everest is the highest mountain above sea level in the world, reaching approximately 8,849 metres above sea level. It is located in the Himalayas, along the border between Nepal and the Tibet Autonomous Region of China. The mountain is known as Sagarmatha in Nepal and Chomolungma in Tibet. Its extreme altitude, freezing temperatures and unpredictable weather make climbing it an enormous challenge, requiring specialised equipment and extensive preparation. In 1953, Edmund Hillary and Tenzing Norgay became the first confirmed climbers to successfully reach its summit. Since then, it has attracted mountaineers from around the world, becoming one of the most famous and challenging climbing destinations on Earth.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_view_from_Pima_Point_2010.jpg?width=800',
'Grand Canyon',
'Geography',
'The Grand Canyon is a vast natural canyon located in the state of Arizona in the United States. It was primarily carved by the Colorado River over millions of years, gradually exposing layers of rock that reveal a remarkable geological history. The canyon stretches approximately 446 kilometres in length and reaches depths of over 1,800 metres in some areas. Its exposed rock formations provide scientists with valuable evidence about the geological processes that have shaped the Earth over billions of years. The area is also home to diverse wildlife and plant species, as well as having deep cultural significance for several Indigenous communities. Today, it is one of the most visited natural landmarks in the United States and a UNESCO World Heritage Site.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/3Falls_Niagara.jpg?width=800',
'Niagara Falls',
'Geography',
'Niagara Falls is a collection of three large waterfalls located along the border between Ontario, Canada, and New York State in the United States. The three waterfalls are the Horseshoe Falls, American Falls and Bridal Veil Falls. Together, they create one of the most powerful and impressive displays of flowing water in North America. The falls were formed thousands of years ago following the retreat of glaciers at the end of the last Ice Age. Beyond their natural beauty, they are an important source of hydroelectric power, supplying electricity to surrounding regions in both countries. They also attract millions of tourists annually, making them one of the most famous natural attractions in North America.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/Uluru_(Helicopter_view)-crop.jpg?width=800',
'Uluru',
'Geography',
'Uluru is a massive sandstone rock formation located in the Northern Territory of Australia, within Uluru-Kata Tjuta National Park. Rising approximately 348 metres above the surrounding landscape, it is particularly famous for its changing colours, which can appear red, orange and purple depending on the position of the Sun. The formation is estimated to be hundreds of millions of years old and holds profound spiritual and cultural significance for the Anangu people, the traditional custodians of the land. Its caves, rock art and surrounding landscape are connected to important Indigenous traditions and stories. In 1987, the area was recognised as a UNESCO World Heritage Site for its natural and cultural significance. It remains one of Australia''s most important natural and cultural landmarks.'
),

(
'https://commons.wikimedia.org/wiki/Special:FilePath/MtFuji_FujiCity.jpg?width=800',
'Mount Fuji',
'Geography',
'Mount Fuji is the tallest mountain in Japan, standing approximately 3,776 metres above sea level. Located on the Japanese island of Honshu, it is an active volcano that last erupted in 1707. Its distinctive symmetrical cone shape has made it one of the most recognisable natural landmarks in the world. The mountain holds great spiritual significance in Japanese culture and has been a destination for religious pilgrims for centuries. It has also inspired countless works of Japanese art, most famously The Great Wave off Kanagawa by artist Hokusai. In 2013, Mount Fuji was recognised as a UNESCO World Heritage Site for its cultural significance. Today, it remains a popular destination for climbers, photographers and tourists.'
);

 
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
 
INSERT INTO user_account (username, password, age, school)
VALUES
('alex123', 'password123', '2008-04-15', 'Watford Grammar School'),
('sarah22', 'password456', '2007-09-22', 'Queens School'),
('james99', 'password789', '2008-12-03', 'Parmiters School');

INSERT INTO user_game_stats (
    user_id,
    historical_figures_points,
    monuments_points,
    geography_points,
    historical_figures_games,
    monuments_games,
    geography_games
)
SELECT
    user_id,
    CASE username
        WHEN 'alex123' THEN 120
        WHEN 'sarah22' THEN 200
        WHEN 'james99' THEN 80
    END,
    CASE username
        WHEN 'alex123' THEN 90
        WHEN 'sarah22' THEN 150
        WHEN 'james99' THEN 110
    END,
    CASE username
        WHEN 'alex123' THEN 140
        WHEN 'sarah22' THEN 100
        WHEN 'james99' THEN 160
    END,
    CASE username
        WHEN 'alex123' THEN 5
        WHEN 'sarah22' THEN 8
        WHEN 'james99' THEN 3
    END,
    CASE username
        WHEN 'alex123' THEN 4
        WHEN 'sarah22' THEN 6
        WHEN 'james99' THEN 5
    END,
    CASE username
        WHEN 'alex123' THEN 7
        WHEN 'sarah22' THEN 4
        WHEN 'james99' THEN 6
    END
FROM user_account
WHERE username IN ('alex123', 'sarah22', 'james99');