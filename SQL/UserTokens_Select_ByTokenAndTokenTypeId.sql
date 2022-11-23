USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Select_ByTokenAndTokenTypeId]    Script Date: 11/23/2022 2:26:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <11/04/2022>
-- Description: <Selects UserId by TokenTypeId and Token>
-- Code Reviewer: Miyah Robinson

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[UserTokens_Select_ByTokenAndTokenTypeId]
	@TokenTypeId int,
	@Token varchar(200)

AS

/*

	DECLARE @TokenTypeId int = 1,
			@Token varchar(200) = 'e62c9262-9fdd-417b-af28-6b6a74f87e2f'

	EXECUTE [dbo].[UserTokens_Select_ByTokenAndTokenTypeId] 
			@TokenTypeId
			, @Token

*/

BEGIN

	SELECT [UserId]
			
	FROM [dbo].[UserTokens]
	WHERE TokenTypeId = @TokenTypeId AND Token = @Token

END
