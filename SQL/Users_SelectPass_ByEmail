USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectPass_ByEmail]    Script Date: 11/23/2022 2:24:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/20/2022>
-- Description: <Selects User password by Email>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Users_SelectPass_ByEmail]
	@Email nvarchar(255)
AS

/*
	DECLARE @Email nvarchar(255) = 'testEmail4@email.com'
	EXECUTE dbo.Users_SelectPass_ByEmail @Email
*/

BEGIN

	SELECT [Id]
		  ,[Email]
		  ,[Password]
	  FROM [dbo].[Users]
	  WHERE Email = @Email

END
