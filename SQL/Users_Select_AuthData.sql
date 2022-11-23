USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_AuthData]    Script Date: 11/23/2022 2:21:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/20/2022>
-- Description: <Selects User by Email and associated UserRoles. This data will be put inside Auth Cookie.>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Users_Select_AuthData]
	@Email nvarchar(255)

AS

/*
	DECLARE @Email nvarchar(255) = 'demoPostmanAndrewTest@email.com'

	EXECUTE dbo.Users_Select_AuthData @Email

*/

BEGIN

DECLARE @Id int =0;
 set @Id = (select u.id FROM [dbo].[Users] as u

	WHERE u.Email = @Email )

	SELECT u.Id
		  ,[Email]		  
		  ,[Password]
		
	FROM [dbo].[Users] as u

	WHERE u.Email = @Email 
	AND IsConfirmed = 1 AND StatusTypeId = 1

	SELECT r.[Name]
					FROM dbo.Roles AS r INNER JOIN dbo.UserRoles AS ur
									ON r.Id = ur.RoleId
					WHERE ur.UserId = @Id
END


