create database if not exists computer_management;
use computer_management;

create table if not exists user (
  id int primary key auto_increment,
  firstname varchar(50) not null,
  lastname varchar(50) not null,
  email varchar(100) not null unique,
  phonenumber varchar(10) not null unique,
  password varchar(255) not null,
  created_at datetime default current_timestamp, 
  image varchar(255) default 'default.png',
  is_locked boolean default false,
  role enum('ADMIN', 'SALESPERSON', 'ACCOUNTANT') not null,
  gender enum('MALE', 'FEMALE'),
  code bigint default 0
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci; 

create table if not exists product (
  id varchar(255) primary key,
  name varchar(255) not null,
  category varchar(255) not null,
  imported_price int not null,
  retailed_price int not null,
  quantity int not null,
  manufacturer varchar(100),
  image varchar(255) default 'default_product.png',
  created_at datetime default current_timestamp,
  mainboard varchar(255),
  cpu varchar(255),
  ram varchar(255),
  storage varchar(255),
  screen varchar(255),
  gpu varchar(255),
  weight varchar(100),
  description text
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

create table if not exists customer (
  id int primary key auto_increment,
  name varchar(100) not null,
  email varchar(100) not null unique,
  phonenumber varchar(10) not null unique,
  created_at datetime default current_timestamp, 
  password varchar(255),
  image varchar(255) default 'default.png',
  is_locked boolean default false,
  `rank` enum('BRONZE', 'SILVER', 'GOLD', 'DIAMOND') default 'BRONZE', 
  address varchar(255) not null
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

create table if not exists `order` (
  id varchar(255) primary key,
  customer_name varchar(255) not null,
  customer_phone varchar(10) not null,
  total_quantity int not null,
  total_price int not null,
  address varchar(255) not null,
  created_at datetime default current_timestamp,
  payment_method enum('COD', 'CREDIT_CARD', 'BANK_TRANSFER', 'MOMO') not null,
  status enum('PENDING', 'CONFIRMED', 'CANCELLED') default 'PENDING',
  salesperson_id int,
  code varchar(255) unique
  /* foreign key (customer_phone) references customer(phonenumber) */
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

create table if not exists order_detail (
  order_id varchar(255) not null,
  product_id varchar(255) not null,
  quantity int not null,
  price int not null,
  foreign key (order_id) references `order`(id),
  foreign key (product_id) references product(id)
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

create table if not exists invoice (
  id int primary key auto_increment,
  order_id varchar(255) not null,
  customer_id int not null,
  total_price int not null,
  created_at datetime default current_timestamp,
  foreign key (order_id) references `order`(id),
  foreign key (customer_id) references customer(id)
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

create table if not exists payment (
  id int primary key auto_increment,
  invoice_id int not null,
  amount int not null,
  payment_method enum('COD', 'CREDIT_CARD', 'BANK_TRANSFER', 'MOMO') not null,
  created_at datetime default current_timestamp,
  foreign key (invoice_id) references invoice(id)
) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;


/* 
  password admin admin123 
           btran btran987
*/
INSERT INTO user (firstname, lastname, email, phonenumber, password, role, gender)
VALUES ('Nguyễn', 'Văn A', 'admin@email.com', '0123456789', '$2b$10$CTM1CtfcA1lsmZh/zhgFFegxLl0RrVmzOJoTvNCXcCeKsU3N5rxm6', 'ADMIN', 'MALE');

INSERT INTO user (firstname, lastname, email, phonenumber, password, role, gender)
VALUES ('Trần', 'Văn B', 'btran@email.com', '0991112345', '$2b$10$ypOBnXm.IUjQikl5S9TePu5pBxaN5z4QTyHXnUG0awicv6zbO.IyW', 'SALESPERSON', 'MALE');

INSERT INTO user (firstname, lastname, email, phonenumber, password, role, gender)
VALUES ('Nguyễn Thị', 'Huỳnh T', 'huynht112@email.com', '0118882337', 'huynht123', 'ACCOUNTANT', 'FEMALE');


INSERT INTO product (id, name, category, imported_price, retailed_price, quantity, manufacturer, cpu, ram, storage, screen, gpu, weight, description)
VALUES
('dell-inspiron-15-3520', 'Dell Inspiron 15 3520', 'LAPTOP-OFFICE-VĂN PHÒNG', 14000000, 16490000, 10, 'Dell', 'Intel Core i5-1235U', '16GB', '512GB', '15.6" FHD', 'Intel Iris Xe', '1.65kg', 'Laptop Dell Inspiron 15 3520 với hiệu năng ổn định, phù hợp cho công việc văn phòng và học tập.'),
('asus-vivobook-14-e1404fa-nk186w', 'ASUS VivoBook 14 E1404FA-NK186W', 'LAPTOP-OFFICE-VĂN PHÒNG', 10500000, 11890000, 15, 'ASUS', 'AMD Ryzen 5 7520U', '16GB', '512GB', '14" FHD', 'AMD Radeon Graphics', '1.4kg', 'ASUS VivoBook 14 với thiết kế nhỏ gọn, hiệu năng mạnh mẽ, phù hợp cho sinh viên và nhân viên văn phòng.'),
('hp-14-ep0220tu', 'HP 14-ep0220TU', 'LAPTOP-OFFICE-VĂN PHÒNG', 10000000, 11290000, 12, 'HP', 'Intel Core i3-1315U', '8GB', '512GB', '14" FHD', 'Intel UHD Graphics', '1.46kg', 'HP 14-ep0220TU với thiết kế mỏng nhẹ, hiệu năng ổn định, phù hợp cho nhu cầu học tập và làm việc cơ bản.'),
('lenovo-loq-essential-15iax9e', 'Lenovo LOQ Essential 15IAX9E', 'LAPTOP-GAMING', 17000000, 19490000, 8, 'Lenovo', 'Intel Core i5-12450HX', '12GB', '512GB', '15.6" FHD', 'NVIDIA GeForce RTX 3050', '2.4kg', 'Lenovo LOQ Essential 15IAX9E với hiệu năng mạnh mẽ, phù hợp cho công việc và giải trí.'),
('asus-tuf-gaming-f15-fx507zc4-hn095w', 'ASUS TUF Gaming F15 FX507ZC4-HN095W', 'LAPTOP-GAMING', 18000000, 20290000, 5, 'ASUS', 'Intel Core i5-12500H', '16GB', '512GB', '15.6" FHD 144Hz', 'NVIDIA GeForce RTX 3050', '2.3kg', 'ASUS TUF Gaming F15 với hiệu năng cao, phù hợp cho game thủ và người dùng chuyên nghiệp.'),
('hp-probook-440-g10', 'HP ProBook 440 G10', 'LAPTOP-OFFICE-VĂN PHÒNG', 21000000, 23290000, 7, 'HP', 'Intel Core i5-1340P', '16GB', '512GB', '14" FHD Touch', 'Intel Iris Xe', '1.38kg', 'HP ProBook 440 G10 với thiết kế sang trọng, hiệu năng mạnh mẽ, phù hợp cho doanh nhân và nhân viên văn phòng.'),
('huawei-matebook-d15', 'Huawei MateBook D15', 'LAPTOP-OFFICE-VĂN PHÒNG', 13000000, 14900000, 10, 'Huawei', 'AMD Ryzen 7 5700U', '16GB', '512GB', '15.6" FHD', 'AMD Radeon Graphics', '1.56kg', 'Huawei MateBook D15 với thiết kế tinh tế, hiệu năng ổn định, phù hợp cho công việc và giải trí.'),
('asus-vivobook-15x-oled-a1503za-l1139w', 'ASUS VivoBook 15X OLED A1503ZA-L1139W', 'LAPTOP-OFFICE-VĂN PHÒNG', 14000000, 15990000, 9, 'ASUS', 'Intel Core i5-12500H', '8GB', '512GB', '15.6" OLED', 'Intel Iris Xe', '1.7kg', 'ASUS VivoBook 15X OLED với màn hình OLED sắc nét, hiệu năng mạnh mẽ, phù hợp cho công việc sáng tạo.'),
('dell-latitude-5450', 'Dell Latitude 5450', 'LAPTOP-OFFICE-VĂN PHÒNG', 22000000, 24690000, 6, 'Dell', 'Intel Ultra 5-125U', '16GB', '512GB', '14" FHD', 'Intel Iris Xe', '1.4kg', 'Dell Latitude 5450 với thiết kế bền bỉ, hiệu năng ổn định, phù hợp cho doanh nghiệp và người dùng chuyên nghiệp.'),
('lenovo-ideapad-slim-3-14irh10', 'Lenovo IdeaPad Slim 3 14IRH10', 'LAPTOP-OFFICE-VĂN PHÒNG', 14000000, 15290000, 11, 'Lenovo', 'Intel Core i5-13420H', '16GB', '512GB', '14" WUXGA', 'Intel Iris Xe', '1.45kg', 'Lenovo IdeaPad Slim 3 14IRH10 với thiết kế mỏng nhẹ, hiệu năng mạnh mẽ, phù hợp cho học tập và làm việc.'),
('msi-modern-14-c7m-049us', 'MSI Modern 14 C7M-049US', 'LAPTOP-OFFICE-VĂN PHÒNG', 12000000, 13490000, 8, 'MSI', 'AMD Ryzen 5-7530U', '8GB', '512GB', '14" FHD', 'AMD Radeon Graphics', '1.3kg', 'MSI Modern 14 với thiết kế hiện đại, hiệu năng ổn định, phù hợp cho công việc và giải trí.'),
('acer-aspire-5-a515-44-r2sa', 'Acer Aspire 5 A515-44-R2SA', 'LAPTOP-OFFICE-VĂN PHÒNG', 11000000, 12990000, 10, 'Acer', 'AMD Ryzen 7 4700U', '8GB', '512GB', '15.6" FHD', 'AMD Radeon Graphics', '1.8kg', 'Acer Aspire 5 với hiệu năng mạnh mẽ, phù hợp cho công việc và học tập.'),
('apple-macbook-air-m1-2020', 'Apple MacBook Air M1 2020', 'LAPTOP-MACBOOK', 22000000, 24900000, 5, 'Apple', 'Apple M1', '8GB', '256GB', '13.3" Retina', 'Apple M1 GPU', '1.29kg', 'MacBook Air M1 với thiết kế mỏng nhẹ, hiệu năng vượt trội, phù hợp cho công việc sáng tạo và di động.'),
('hp-envy-13-ah1507na', 'HP Envy 13-ah1507na', 'LAPTOP-OFFICE-VĂN PHÒNG', 18000000, 19990000, 7, 'HP', 'Intel Core i5-8265U', '8GB', '256GB', '13.3" FHD', 'Intel UHD Graphics 620', '1.3kg', 'HP Envy 13 với thiết kế sang trọng, hiệu năng ổn định, phù hợp cho doanh nhân và người dùng di động.'),
('razer-blade-15-advanced', 'Razer Blade 15 Advanced', 'LAPTOP-GAMING', 40000000, 44900000, 3, 'Razer', 'Intel Core i7-11800H', '16GB', '1TB', '15.6" QHD 240Hz', 'NVIDIA GeForce RTX 3060', '2.1kg', 'Razer Blade 15 Advanced với hiệu năng cao, thiết kế tinh tế, phù hợp cho game thủ và người dùng chuyên nghiệp.');


INSERT INTO product (id, name, category, imported_price, retailed_price, quantity, manufacturer, cpu, ram, storage, screen, gpu, weight, description)
VALUES
-- PC Gaming từ GEARVN
('gvn-phantom-a3070ti', 'GVN PHANTOM a3070Ti', 'PC-GAMING', 45000000, 49000000, 5, 'GEARVN', 'AMD Ryzen 7 7700', '32GB DDR5', '500GB SSD', NULL, 'NVIDIA RTX 3070 Ti', NULL, 'PC gaming cao cấp với hiệu năng mạnh mẽ, phù hợp cho game thủ chuyên nghiệp.'),
('gvn-ivy-10m', 'GVN IVY 10M', 'PC-GAMING', 11000000, 12900000, 10, 'GEARVN', 'Intel Core i3-10100', '8GB DDR4', '120GB SSD', NULL, 'NVIDIA GTX 1650S', NULL, 'PC gaming giá rẻ, phù hợp cho người mới bắt đầu chơi game.'),
-- PC Văn Phòng từ Huy An Phát
('hap-vp115b', 'HAP-VP115B', 'PC-OFFICE', 9000000, 9990000, 8, 'Huy An Phát', 'Intel Core i5', '8GB', '256GB SSD', NULL, 'Intel UHD Graphics', NULL, 'PC văn phòng hiệu năng ổn định, phù hợp cho công việc hàng ngày.'),
-- PC Văn Phòng từ Vi Tính Ông Đồn
('vp-i5-4570', 'PC Văn Phòng i5 4570', 'PC-OFFICE', 8500000, 9500000, 12, 'Vi Tính Ông Đồn', 'Intel Core i5-4570', '8GB DDR3', '256GB SSD', NULL, 'Intel HD Graphics', NULL, 'PC văn phòng giá rẻ, đáp ứng nhu cầu công việc cơ bản.');