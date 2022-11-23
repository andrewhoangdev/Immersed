USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 11/23/2022 2:20:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Creates new User>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Users_Insert]
	@Id int OUTPUT
	,@Email nvarchar(255)
	,@FirstName nvarchar(100)
	,@LastName nvarchar(100)
	,@Mi nvarchar(2)
	,@AvatarUrl varchar(255)
	,@Password varchar(100)
	,@StatusTypeId int

AS

/*
	DECLARE @Id int = 0
			,@Email nvarchar(255) = 'testEmail@email.com'
			,@FirstName nvarchar(100) = 'testFirstName'
			,@LastName nvarchar(100) = 'testLastName'
			,@Mi nvarchar(2) = 'MI'
			,@AvatarUrl varchar(255) = 'testAvatarUrl'
			,@Password varchar(100) = 'testPassword'
			,@StatusTypeId int = 1

	EXECUTE dbo.Users_Insert
			@Id OUTPUT
			,@Email
			,@FirstName
			,@LastName
			,@Mi
			,@AvatarUrl
			,@Password
			,@StatusTypeId

	SELECT *
	FROM dbo.users
	WHERE Id = @Id
*/

BEGIN

	INSERT INTO [dbo].[Users]
				([Email]
				,[FirstName]
				,[LastName]
				,[Mi]
				,[AvatarUrl]
				,[Password]
				,[StatusTypeId])
     VALUES (@Email
			,@FirstName
			,@LastName
			,@Mi
			,@AvatarUrl
			,@Password
			,@StatusTypeId)
	SET @Id = SCOPE_IDENTITY()

END
