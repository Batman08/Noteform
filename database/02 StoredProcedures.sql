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


-- [spSaveNoteData]
-- This will save a users note data
-- --------------------------------

DROP procedure IF EXISTS `spSaveNoteData`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spSaveNoteData`(IN p_UserId INT, IN p_Title VARCHAR(256), IN p_Description VARCHAR(256))
BEGIN
	INSERT INTO NoteDetails(UserId, Title, Description)
    VALUES(p_UserId, p_Title, p_Description);
END$$
DELIMITER ;


-- [spGetAllNoteData]
-- This will return all note data for a user
-- -----------------------------------------

DROP procedure IF EXISTS `spGetAllNoteData`;
DELIMITER $$
CREATE PROCEDURE `spGetAllNoteData` (IN p_UserId INT)
BEGIN
	select nd.NoteId, nd.Title, nd.Description
	FROM NoteDetails nd
		INNER JOIN Users u ON nd.UserId = U.UserId
	WHERE nd.UserId = p_UserId
	ORDER BY nd.NoteId DESC;
END$$
DELIMITER ;


-- [spGetNoteData]
-- This will get a specific user note data
-- ---------------------------------------

DROP procedure IF EXISTS `spGetNoteData`;
DELIMITER $$
CREATE PROCEDURE `spGetNoteData` (IN p_UserId INT, IN p_NoteId INT)
BEGIN
	SELECT nd.Title, nd.Description
	FROM NoteDetails nd
		INNER JOIN Users u on u.UserId = nd.UserId
	WHERE u.UserId = p_UserId AND nd.NoteId = p_NoteId;
END$$
DELIMITER ;


-- [spUpdateNoteData]
-- This will update the edited note
-- --------------------------------

DROP procedure IF EXISTS `spUpdateNoteData`;
DELIMITER $$
CREATE PROCEDURE `spUpdateNoteData` (IN p_NoteId INT, IN p_UserId INT, IN p_Title VARCHAR(256), IN p_Description VARCHAR(256))
BEGIN
	UPDATE NoteDetails 
	SET Title = p_Title, Description = p_Description
	WHERE UserId = p_UserId AND NoteId =  p_NoteId;
END$$
DELIMITER ;
