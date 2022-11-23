USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatus]    Script Date: 11/23/2022 2:24:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/20/2022>
-- Description: <Updates User StatusTypeId, used to activate/deactivate users instead of delete>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Users_UpdateStatus]
	@Id int

AS

/*	
	DECLARE @Id int = 16

	SELECT * 
	FROM dbo.Users
	WHERE id = @Id

	EXECUTE dbo.Users_UpdateStatus @Id

	SELECT * 
	FROM dbo.Users
	WHERE id = @Id
*/

BEGIN

	DECLARE @StatusTypeId int = 2
			,@dateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[Users]
	SET [StatusTypeId] = @StatusTypeId      
		,[DateModified] = @dateNow
	WHERE Id = @Id

 END 
