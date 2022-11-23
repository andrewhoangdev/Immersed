USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_Paginated]    Script Date: 11/23/2022 2:23:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Selects all Users in Paginated View>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Users_SelectAll_Paginated]
	@PageIndex int
	,@PageSize int

AS

/*
	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE dbo.Users_SelectAll_Paginated @PageIndex, @PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [Id]
		,[Email]
		,[FirstName]
		,[LastName]
		,[Mi]
		,[AvatarUrl]
		,[IsConfirmed]
		,[StatusTypeId]
		,[DateCreated]
		,[DateModified]
		,COUNT(1) OVER() TotalCount
	FROM [dbo].[Users]

	ORDER BY Id

	OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS ONLY

END
