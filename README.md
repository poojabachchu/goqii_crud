First create the database named goqii_crud and create the below table in that db
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4

open postcss.config.js and comment this two lines tailwindcss: {}, autoprefixer: {},

run composer install command
navigate till crud_app in different terminal and run npm install and then npm run dev 

Rename .env.example to .env
change DB_CONNECTION=sqlite to DB_CONNECTION=mysql

In project directory run the command php artisan migrate

Access the website using url http://localhost:3000/ 
