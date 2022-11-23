USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Roles_SelectAll]    Script Date: 11/23/2022 2:18:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Selects all Roles>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Roles_SelectAll]

AS

/*
	EXECUTE dbo.Roles_SelectAll
*/

BEGIN

	SELECT [Id]
			,[Name]
	FROM [dbo].[Roles]

END
