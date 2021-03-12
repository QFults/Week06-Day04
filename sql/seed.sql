USE restaurant_db;

INSERT INTO entrees (name, description, price)
VALUES('Asada Burrito', 'A burrito with asada,rice,and beans', 8),
	    ('Asada Fries', 'A bowl of fries topped with asada, guac, cheese and sour cream', 9),
      ('Shrimp Burrito', 'A burrito with shrimp,rice,lettuce,and sauce', 10),
      ('Nachos', 'A bowl of nachos topped with your choice of meat, guac, sour cream, salsa', 10),
      ('Chicken Burrito', 'A burrito with chicken,rice,and beans', 8);

INSERT INTO drinks(name, size, price)
VALUES('coke', 'large', 3),
	    ('Sprite', 'large', 3),
      ('Dr.Pepper', 'large', 3),
      ('Lemonade', 'large', 3),
      ('Water', 'large', 0);