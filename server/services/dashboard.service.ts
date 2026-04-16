import { prisma } from "@/lib/prisma";

export async function getPersonalDashboardData() {
  const latestTask = await prisma.task.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      team: true,
      keyResult: true,
      objective: true,
    },
  });

  if (!latestTask) {
    return {
      user: null,
      totalTasks: 0,
      completedTasks: 0,
      totalScore: 0,
      latestRetrospective: null,
      tasks: [],
      taskStatusSummary: [],
    };
  }

  const userId = latestTask.userId;

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: [{ taskDate: "desc" }, { createdAt: "desc" }],
    take: 5,
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });

  const allUserTasks = await prisma.task.findMany({
    where: { userId },
    include: {
      keyResult: true,
    },
  });

  const completedTasks = allUserTasks.filter((task) => task.status === "DONE").length;

  const totalScore = allUserTasks.reduce((total, task) => {
    return total + task.contributionScore;
  }, 0);

  const taskStatusSummary = [
    {
      label: "NOT_STARTED",
      value: allUserTasks.filter((task) => task.status === "NOT_STARTED").length,
    },
    {
      label: "IN_PROGRESS",
      value: allUserTasks.filter((task) => task.status === "IN_PROGRESS").length,
    },
    {
      label: "DONE",
      value: allUserTasks.filter((task) => task.status === "DONE").length,
    },
    {
      label: "BLOCKED",
      value: allUserTasks.filter((task) => task.status === "BLOCKED").length,
    },
    {
      label: "CANCELLED",
      value: allUserTasks.filter((task) => task.status === "CANCELLED").length,
    },
  ];

  const latestRetrospective = await prisma.retrospective.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    user: latestTask.user,
    totalTasks: allUserTasks.length,
    completedTasks,
    totalScore,
    latestRetrospective,
    tasks,
    taskStatusSummary,
  };
}

export async function getTeamDashboardData() {
  const latestTask = await prisma.task.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      team: true,
    },
  });

  if (!latestTask) {
    return {
      team: null,
      totalTasks: 0,
      totalScore: 0,
      memberCount: 0,
      retrospectives: [],
      tasks: [],
      taskStatusSummary: [],
      contentPipelineSummary: [],
    };
  }

  const teamId = latestTask.teamId;

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      users: true,
    },
  });

  const recentTasks = await prisma.task.findMany({
    where: { teamId },
    orderBy: [{ taskDate: "desc" }, { createdAt: "desc" }],
    take: 5,
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });

  const allTeamTasks = await prisma.task.findMany({
    where: { teamId },
    include: {
      keyResult: true,
    },
  });

  const totalScore = allTeamTasks.reduce((total, task) => {
    return total + task.contributionScore;
  }, 0);

  const taskStatusSummary = [
    {
      label: "NOT_STARTED",
      value: allTeamTasks.filter((task) => task.status === "NOT_STARTED").length,
    },
    {
      label: "IN_PROGRESS",
      value: allTeamTasks.filter((task) => task.status === "IN_PROGRESS").length,
    },
    {
      label: "DONE",
      value: allTeamTasks.filter((task) => task.status === "DONE").length,
    },
    {
      label: "BLOCKED",
      value: allTeamTasks.filter((task) => task.status === "BLOCKED").length,
    },
    {
      label: "CANCELLED",
      value: allTeamTasks.filter((task) => task.status === "CANCELLED").length,
    },
  ];

  const contentItems = await prisma.content.findMany({
    where: { teamId },
  });

  const contentPipelineSummary = [
    {
      label: "IDEA",
      value: contentItems.filter((item) => item.status === "IDEA").length,
    },
    {
      label: "PENDING",
      value: contentItems.filter((item) => item.status === "PENDING").length,
    },
    {
      label: "PRODUCTION",
      value: contentItems.filter((item) => item.status === "PRODUCTION").length,
    },
    {
      label: "REVIEW",
      value: contentItems.filter((item) => item.status === "REVIEW").length,
    },
    {
      label: "REVISION",
      value: contentItems.filter((item) => item.status === "REVISION").length,
    },
    {
      label: "APPROVED",
      value: contentItems.filter((item) => item.status === "APPROVED").length,
    },
    {
      label: "PUBLISHED",
      value: contentItems.filter((item) => item.status === "PUBLISHED").length,
    },
  ];

  const retrospectives = await prisma.retrospective.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: true,
    },
  });

  return {
    team,
    totalTasks: allTeamTasks.length,
    totalScore,
    memberCount: team?.users.length ?? 0,
    retrospectives,
    tasks: recentTasks,
    taskStatusSummary,
    contentPipelineSummary,
  };
}

export async function getAdminDashboardData() {
  const [
    totalUsers,
    totalTeams,
    totalObjectives,
    totalKeyResults,
    totalTasks,
    totalRetrospectives,
    totalTimeBankEntries,
    allTasks,
    allContents,
    recentRetrospectives,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
    prisma.objective.count(),
    prisma.keyResult.count(),
    prisma.task.count(),
    prisma.retrospective.count(),
    prisma.timeBankEntry.count(),
    prisma.task.findMany(),
    prisma.content.findMany(),
    prisma.retrospective.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: true,
      },
    }),
  ]);

  const taskStatusSummary = [
    {
      label: "NOT_STARTED",
      value: allTasks.filter((task) => task.status === "NOT_STARTED").length,
    },
    {
      label: "IN_PROGRESS",
      value: allTasks.filter((task) => task.status === "IN_PROGRESS").length,
    },
    {
      label: "DONE",
      value: allTasks.filter((task) => task.status === "DONE").length,
    },
    {
      label: "BLOCKED",
      value: allTasks.filter((task) => task.status === "BLOCKED").length,
    },
    {
      label: "CANCELLED",
      value: allTasks.filter((task) => task.status === "CANCELLED").length,
    },
  ];

  const contentPipelineSummary = [
    {
      label: "IDEA",
      value: allContents.filter((item) => item.status === "IDEA").length,
    },
    {
      label: "PENDING",
      value: allContents.filter((item) => item.status === "PENDING").length,
    },
    {
      label: "PRODUCTION",
      value: allContents.filter((item) => item.status === "PRODUCTION").length,
    },
    {
      label: "REVIEW",
      value: allContents.filter((item) => item.status === "REVIEW").length,
    },
    {
      label: "REVISION",
      value: allContents.filter((item) => item.status === "REVISION").length,
    },
    {
      label: "APPROVED",
      value: allContents.filter((item) => item.status === "APPROVED").length,
    },
    {
      label: "PUBLISHED",
      value: allContents.filter((item) => item.status === "PUBLISHED").length,
    },
  ];

  return {
    totalUsers,
    totalTeams,
    totalObjectives,
    totalKeyResults,
    totalTasks,
    totalRetrospectives,
    totalTimeBankEntries,
    taskStatusSummary,
    contentPipelineSummary,
    recentRetrospectives: recentRetrospectives.map((item) => ({
      id: item.id,
      userName: item.user.name,
      weekStart: item.weekStart,
      weekEnd: item.weekEnd,
    })),
  };
}