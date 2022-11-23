USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Insert]    Script Date: 11/23/2022 2:25:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Creates new UserTokens>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[UserTokens_Insert]
	@Token varchar(200)
	,@UserId int
	,@TokenTypeId int

AS

/*
	DECLARE @Token varchar(200) = 'testToken'
			,@UserId int = 1
			,@TokenTypeId int = 1
	
	EXECUTE dbo.UserTokens_Insert
			@Token
		   ,@UserId
		   ,@TokenTypeId

	SELECT *
	FROM dbo.UserTokens
*/

BEGIN

	INSERT INTO [dbo].[UserTokens]
			   ([Token]
			   ,[UserId]
			   ,[TokenTypeId])
	VALUES
           (@Token
		   ,@UserId
		   ,@TokenTypeId)

END
