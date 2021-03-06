USE [Unis]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 4/19/2021 1:24:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Module](
	[ID] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Role]    Script Date: 4/19/2021 1:24:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Code] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RoleModule]    Script Date: 4/19/2021 1:24:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleModule](
	[ID] [int] NOT NULL,
	[ModuleID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 4/19/2021 1:24:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[CreatedDate] [datetime] NOT NULL CONSTRAINT [DF_User_CreatedDate]  DEFAULT (getdate()),
	[ModifiedDate] [datetime] NOT NULL CONSTRAINT [DF_User_CreatedDate1]  DEFAULT (getdate()),
	[IsActive] [bit] NULL CONSTRAINT [DF_User_Status]  DEFAULT (NULL),
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 4/19/2021 1:24:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[ID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([ID], [UserName], [Password], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (1, N'hungtrieu', N'ee51236106d86c89019e4c8ed52cf3b6', CAST(N'2021-04-19 00:50:10.797' AS DateTime), CAST(N'2021-04-19 00:50:10.797' AS DateTime), 1)
INSERT [dbo].[User] ([ID], [UserName], [Password], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (2, N'hungtrieu123', N'0566b2480da47c5838fafc59ed3937f5', CAST(N'2021-04-19 00:50:10.797' AS DateTime), CAST(N'2021-04-19 00:50:10.797' AS DateTime), 1)
INSERT [dbo].[User] ([ID], [UserName], [Password], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (4, N'hungtrieu12345', N'0566b2480da47c5838fafc59ed3937f5', CAST(N'2021-04-19 01:11:37.747' AS DateTime), CAST(N'2021-04-19 01:11:37.747' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[RoleModule] ADD  CONSTRAINT [DF_RoleModule_UserID]  DEFAULT (NULL) FOR [ModuleID]
GO
ALTER TABLE [dbo].[RoleModule] ADD  CONSTRAINT [DF_RoleModule_RoleID]  DEFAULT (NULL) FOR [RoleID]
GO
ALTER TABLE [dbo].[UserRole] ADD  CONSTRAINT [DF_UserRole_UserID]  DEFAULT (NULL) FOR [UserID]
GO
ALTER TABLE [dbo].[UserRole] ADD  CONSTRAINT [DF_UserRole_RoleID]  DEFAULT (NULL) FOR [RoleID]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Khoá chính' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Khoá chính' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tên quyền' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Mã quyền' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'Code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quyền người dùng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Khoá chính' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RoleModule', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ID module' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RoleModule', @level2type=N'COLUMN',@level2name=N'ModuleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ID quyền' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RoleModule', @level2type=N'COLUMN',@level2name=N'RoleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Khoá chính' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tên tài khoản' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Mật khẩu' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Password'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ngày tạo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'CreatedDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ngày sửa' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'ModifiedDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1: Kích hoạt; 0: Không KH' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'IsActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Người dùng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Khoá chính' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ID người dùng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole', @level2type=N'COLUMN',@level2name=N'UserID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ID quyền' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole', @level2type=N'COLUMN',@level2name=N'RoleID'
GO
