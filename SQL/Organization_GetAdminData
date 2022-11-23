USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Organization_GetAdminData]    Script Date: 11/23/2022 2:15:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <ANDREW HOANG>
-- Create date: <11/12/2022>
-- Description: <Selects total employee count and training schedules for organization from orgId, and gets latest blog post>
-- Code Reviewer: <THINZAR SOE>

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Organization_GetAdminData]
		@OrganizationId int
		,@numberSelection int

AS

/*
	DECLARE @OrganizationId int = 73
			, @numberSelection int = 2

	EXECUTE dbo.Organization_GetAdminData @OrganizationId
										, @numberSelection

*/

BEGIN

	SELECT TotalCount = COUNT (1)

	FROM dbo.Employees AS e INNER JOIN dbo.Users as u
							ON e.UserId = u.Id
							INNER JOIN dbo.Organizations AS o
							ON e.OrganizationId = o.Id
	WHERE e.OrganizationId = @OrganizationId

	SELECT ts.[Id]
      ,ts.[Name]
      ,ts.[TrainingUnitId]
      ,ts.[DaysOfWeekId]
      ,ts.[StartTime]
      ,ts.[EndTime]
      ,ts.[StartDate]
      ,ts.[EndDate]
      ,ts.[isDeleted]
      ,ts.[ModifiedBy]
      ,ts.[CreatedBy]
      ,ts.[DateCreated]
      ,ts.[DateModified]
			,TotalCount = COUNT (1) OVER()

	FROM dbo.TrainingSchedules as ts INNER JOIN dbo.TrainingUnits as tu
								ON ts.TrainingUnitId = tu.Id
	WHERE tu.OrganizationId = @OrganizationId

	EXECUTE dbo.Blogs_GetLatest @numberSelection

	SELECT TotalCount = COUNT (1)

	FROM dbo.Trainees as t INNER JOIN dbo.TrainingUnits as tu
								ON t.TrainingUnitId = tu.Id
	WHERE tu.OrganizationId = @OrganizationId

END
