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
