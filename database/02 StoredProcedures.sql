USE `Noteform`;

-- [spSaveLoginDetails]
-- This will save login details
-- ----------------------------

DROP procedure IF EXISTS `spSaveLoginDetails`;
DELIMITER $$
CREATE PROCEDURE `spSaveLoginDetails` (IN p_Username varchar(256), IN p_Password varchar(256))
BEGIN
	INSERT INTO Users (Username, Password) VALUES(p_Username, p_Password);
END$$
DELIMITER ;


-- [spGetUserLoginDetails]
-- This will return a username and password 
-- ----------------------------------------

DROP procedure IF EXISTS `spGetUserLoginDetails`;
DELIMITER $$
CREATE PROCEDURE `spGetUserLoginDetails` (IN p_Username Varchar(256))
BEGIN
	SELECT UserId, Username, Password
	FROM Users u
	WHERE u.Username = p_Username;
END$$
DELIMITER ;