USE `Noteform`;

-- [Users]
-- -------

CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
 CONSTRAINT `PK_Users_1` PRIMARY KEY 
(
	`UserId` ASC
) ,
 CONSTRAINT `IX_Users` UNIQUE 
(
	`Username` ASC
) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- [Note Details]
-- -------

CREATE TABLE `notedetails` (
  `NoteId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Title` VARCHAR(256) NOT NULL,
  `Description` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`NoteId`),
  KEY `UserId_idx` (`UserId`),
  CONSTRAINT `UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
