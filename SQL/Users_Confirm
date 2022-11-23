USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Confirm]    Script Date: 11/23/2022 2:19:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/20/2022>
-- Description: <Updates User Confirmed column to true. To be used after confirming email of User>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: <Andrew Hoang>
-- MODIFIED DATE: <11/04/2022>
-- Code Reviewer: Miyah Robinson
-- Note: <Modified the proc to include if/else statement to check that declared token matches token in db and removed UserId>
-- =============================================

ALTER PROC [dbo].[Users_Confirm]
	@Email nvarchar(255),
	@Token varchar(200)

AS

/*	

	DECLARE @Email nvarchar(255) = 'andrewTest@dispostable.com',
			@Token varchar(200) = '0a7b7839-2527-4442-b523-b4f4be527c25'
			
	SELECT * 
	FROM dbo.Users
	WHERE Email = @Email

	EXECUTE dbo.Users_Confirm @Email, @Token

	SELECT * 
	FROM dbo.Users
	WHERE Email = @Email

*/
	BEGIN
		
		IF NOT EXISTS 
			(
			SELECT 1
			FROM dbo.UserTokens INNER JOIN dbo.Users
			ON dbo.UserTokens.UserId = dbo.Users.Id
			WHERE dbo.UserTokens.Token = @Token 
				AND TokenTypeId= 1
				AND dbo.Users.Email = @Email
			)

		THROW 50001, N'Token not found', 1

		ELSE

		DECLARE @IsConfirmed bit = 1
				,@dateNow datetime2 = GETUTCDATE()			

		UPDATE [dbo].[Users]
		SET IsConfirmed = @IsConfirmed      
			,[DateModified] = @dateNow
		WHERE Email = @Email 

		EXECUTE [dbo].[UserTokens_Delete_ByToken] @Token		

	 END 
