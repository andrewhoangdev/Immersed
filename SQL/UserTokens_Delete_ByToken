USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Delete_ByToken]    Script Date: 11/23/2022 2:25:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Deletes UserTokens by Token>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[UserTokens_Delete_ByToken]
	@Token varchar(200)

AS

/*
	DECLARE @Token varchar(200) = 'd5f41806-c729-4f58-9d81-18cfe14538eb'

	SELECT *
	FROM dbo.UserTokens
	WHERE Token = @Token

	EXECUTE dbo.UserTokens_Delete_ByToken @Token

	SELECT *
	FROM dbo.UserTokens
	WHERE Token = @Token
*/

BEGIN

	DELETE FROM [dbo].[UserTokens]
    WHERE Token = @Token

END
