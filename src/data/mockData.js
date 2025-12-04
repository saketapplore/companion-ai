// Mock data for demonstration purposes

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 234-567-8901",
    gender: "Male",
    age: 28,
    location: "New York, USA",
    registrationDate: "2024-01-15",
    status: "active",
    walletBalance: 150.50,
    totalConversations: 45,
    lastActive: "2024-12-03"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+1 234-567-8902",
    gender: "Female",
    age: 32,
    location: "Los Angeles, USA",
    registrationDate: "2024-02-20",
    status: "active",
    walletBalance: 89.25,
    totalConversations: 32,
    lastActive: "2024-12-04"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    mobile: "+1 234-567-8903",
    gender: "Male",
    age: 25,
    location: "Chicago, USA",
    registrationDate: "2024-03-10",
    status: "suspended",
    walletBalance: 200.00,
    totalConversations: 67,
    lastActive: "2024-11-28"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    mobile: "+1 234-567-8904",
    gender: "Female",
    age: 29,
    location: "Houston, USA",
    registrationDate: "2024-01-25",
    status: "active",
    walletBalance: 45.75,
    totalConversations: 23,
    lastActive: "2024-12-02"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    mobile: "+1 234-567-8905",
    gender: "Male",
    age: 35,
    location: "Phoenix, USA",
    registrationDate: "2024-04-05",
    status: "active",
    walletBalance: 320.00,
    totalConversations: 89,
    lastActive: "2024-12-04"
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    mobile: "+1 234-567-8906",
    gender: "Female",
    age: 27,
    location: "Philadelphia, USA",
    registrationDate: "2024-02-14",
    status: "active",
    walletBalance: 125.50,
    totalConversations: 41,
    lastActive: "2024-12-01"
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "robert.m@example.com",
    mobile: "+1 234-567-8907",
    gender: "Male",
    age: 31,
    location: "San Antonio, USA",
    registrationDate: "2024-05-20",
    status: "active",
    walletBalance: 78.00,
    totalConversations: 19,
    lastActive: "2024-12-03"
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    mobile: "+1 234-567-8908",
    gender: "Female",
    age: 26,
    location: "San Diego, USA",
    registrationDate: "2024-03-30",
    status: "suspended",
    walletBalance: 15.25,
    totalConversations: 8,
    lastActive: "2024-11-15"
  }
]

export const mockConversations = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    companionName: "Luna",
    date: "2024-12-04",
    time: "14:30:00",
    duration: 25,
    summary: "User discussed work-life balance challenges. Sought advice on managing stress and setting boundaries. Luna provided coping strategies and encouraged mindfulness practices.",
    topics: ["Stress Management", "Work-Life Balance", "Mental Health"],
    sentiment: "positive",
    qualityScore: 9.2
  },
  {
    id: 2,
    userId: 2,
    userName: "Jane Smith",
    companionName: "Alex",
    date: "2024-12-04",
    time: "10:15:00",
    duration: 18,
    summary: "Casual conversation about hobbies and interests. User shared experiences from recent hiking trip. Alex engaged with enthusiasm and shared relevant outdoor tips.",
    topics: ["Hobbies", "Outdoor Activities", "Travel"],
    sentiment: "positive",
    qualityScore: 8.7
  },
  {
    id: 3,
    userId: 1,
    userName: "John Doe",
    companionName: "Luna",
    date: "2024-12-03",
    time: "19:45:00",
    duration: 30,
    summary: "Deep conversation about career goals and aspirations. User expressed concerns about career transition. Luna provided supportive guidance and helped explore different perspectives.",
    topics: ["Career Development", "Goal Setting", "Personal Growth"],
    sentiment: "neutral",
    qualityScore: 9.5
  },
  {
    id: 4,
    userId: 5,
    userName: "David Wilson",
    companionName: "Maya",
    date: "2024-12-03",
    time: "16:20:00",
    duration: 45,
    summary: "Extended discussion about relationships and communication. User sought advice on improving interpersonal skills. Maya offered practical communication techniques and active listening strategies.",
    topics: ["Relationships", "Communication Skills", "Personal Development"],
    sentiment: "positive",
    qualityScore: 9.8
  },
  {
    id: 5,
    userId: 3,
    userName: "Mike Johnson",
    companionName: "Sage",
    date: "2024-12-02",
    time: "11:30:00",
    duration: 15,
    summary: "Brief check-in conversation. User shared daily accomplishments and expressed gratitude. Sage provided positive reinforcement and encouragement.",
    topics: ["Daily Reflection", "Gratitude", "Motivation"],
    sentiment: "positive",
    qualityScore: 8.5
  },
  {
    id: 6,
    userId: 4,
    userName: "Emily Davis",
    companionName: "River",
    date: "2024-12-02",
    time: "15:10:00",
    duration: 22,
    summary: "Discussion about time management and productivity. User struggled with procrastination. River suggested practical time-blocking techniques and accountability methods.",
    topics: ["Productivity", "Time Management", "Self-Improvement"],
    sentiment: "neutral",
    qualityScore: 8.9
  },
  {
    id: 7,
    userId: 2,
    userName: "Jane Smith",
    companionName: "Alex",
    date: "2024-12-01",
    time: "09:00:00",
    duration: 20,
    summary: "Morning motivation session. User set daily intentions and goals. Alex provided enthusiastic support and helped break down goals into actionable steps.",
    topics: ["Goal Setting", "Motivation", "Daily Planning"],
    sentiment: "positive",
    qualityScore: 9.0
  },
  {
    id: 8,
    userId: 6,
    userName: "Sarah Brown",
    companionName: "Zen",
    date: "2024-12-01",
    time: "20:30:00",
    duration: 28,
    summary: "Evening reflection on personal challenges. User expressed feelings about recent setbacks. Zen provided empathetic listening and helped reframe perspectives positively.",
    topics: ["Emotional Support", "Resilience", "Mindfulness"],
    sentiment: "neutral",
    qualityScore: 9.3
  },
  {
    id: 9,
    userId: 7,
    userName: "Robert Martinez",
    companionName: "Nova",
    date: "2024-11-30",
    time: "13:45:00",
    duration: 12,
    summary: "Quick conversation about weekend plans. User shared excitement about upcoming events. Nova engaged with interest and offered suggestions.",
    topics: ["Leisure", "Social Activities", "Planning"],
    sentiment: "positive",
    qualityScore: 8.2
  },
  {
    id: 10,
    userId: 5,
    userName: "David Wilson",
    companionName: "Maya",
    date: "2024-11-30",
    time: "17:15:00",
    duration: 35,
    summary: "In-depth discussion about learning new skills. User explored interests in creative pursuits. Maya encouraged exploration and provided resources and learning strategies.",
    topics: ["Learning", "Creativity", "Skill Development"],
    sentiment: "positive",
    qualityScore: 9.6
  }
]

export const mockAnalytics = {
  salesFigures: {
    today: 245.50,
    thisWeek: 1580.75,
    thisMonth: 6234.25,
    lastMonth: 5890.50,
    totalRevenue: 24567.80,
    growth: 5.8
  },
  minutesConsumed: {
    today: 87,
    thisWeek: 542,
    thisMonth: 2156,
    lastMonth: 2034,
    total: 8965,
    avgPerUser: 112.06
  },
  userStatistics: {
    totalUsers: 8,
    activeUsers: 6,
    newUsersThisMonth: 2,
    retentionRate: 75,
    avgSessionsPerUser: 5.2
  },
  topUsers: [
    { id: 5, name: "David Wilson", minutesUsed: 135, spent: 67.50, rank: 1 },
    { id: 1, name: "John Doe", minutesUsed: 70, spent: 35.00, rank: 2 },
    { id: 3, name: "Mike Johnson", minutesUsed: 67, spent: 33.50, rank: 3 },
    { id: 6, name: "Sarah Brown", minutesUsed: 50, spent: 25.00, rank: 4 },
    { id: 2, name: "Jane Smith", minutesUsed: 50, spent: 25.00, rank: 5 }
  ],
  popularCompanions: [
    { name: "Luna", sessions: 25, totalMinutes: 625, rating: 9.4 },
    { name: "Maya", sessions: 22, totalMinutes: 550, rating: 9.6 },
    { name: "Alex", sessions: 18, totalMinutes: 450, rating: 8.9 },
    { name: "Sage", sessions: 12, totalMinutes: 300, rating: 8.7 },
    { name: "River", sessions: 10, totalMinutes: 250, rating: 9.1 }
  ],
  revenueByMonth: [
    { month: "Jul", revenue: 3450 },
    { month: "Aug", revenue: 4120 },
    { month: "Sep", revenue: 4890 },
    { month: "Oct", revenue: 5340 },
    { month: "Nov", revenue: 5890 },
    { month: "Dec", revenue: 6234 }
  ],
  minutesByMonth: [
    { month: "Jul", minutes: 1456 },
    { month: "Aug", minutes: 1678 },
    { month: "Sep", minutes: 1834 },
    { month: "Oct", minutes: 1945 },
    { month: "Nov", minutes: 2034 },
    { month: "Dec", minutes: 2156 }
  ],
  transactionBreakdown: {
    recharges: { count: 45, amount: 8750.00 },
    purchases: { count: 89, amount: 4450.00 },
    refunds: { count: 3, amount: 150.00 }
  },
  peakUsageHours: [
    { hour: "09:00", sessions: 5 },
    { hour: "12:00", sessions: 8 },
    { hour: "15:00", sessions: 12 },
    { hour: "18:00", sessions: 15 },
    { hour: "21:00", sessions: 10 }
  ]
}

export const mockTransactions = [
  {
    id: 1001,
    userId: 1,
    userName: "John Doe",
    type: "recharge",
    amount: 50.00,
    date: "2024-12-01",
    time: "14:30:22",
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "TXN1001234567"
  },
  {
    id: 1002,
    userId: 2,
    userName: "Jane Smith",
    type: "purchase",
    amount: -25.50,
    date: "2024-12-02",
    time: "10:15:33",
    status: "completed",
    description: "30 minutes conversation",
    transactionId: "TXN1001234568"
  },
  {
    id: 1003,
    userId: 1,
    userName: "John Doe",
    type: "purchase",
    amount: -15.75,
    date: "2024-12-02",
    time: "16:45:11",
    status: "completed",
    description: "15 minutes conversation",
    transactionId: "TXN1001234569"
  },
  {
    id: 1004,
    userId: 5,
    userName: "David Wilson",
    type: "recharge",
    amount: 100.00,
    date: "2024-12-03",
    time: "09:20:45",
    status: "completed",
    paymentMethod: "PayPal",
    transactionId: "TXN1001234570"
  },
  {
    id: 1005,
    userId: 3,
    userName: "Mike Johnson",
    type: "refund",
    amount: 30.00,
    date: "2024-12-03",
    time: "11:55:18",
    status: "completed",
    description: "Service issue compensation",
    transactionId: "TXN1001234571"
  },
  {
    id: 1006,
    userId: 4,
    userName: "Emily Davis",
    type: "purchase",
    amount: -12.25,
    date: "2024-12-03",
    time: "15:30:50",
    status: "completed",
    description: "10 minutes conversation",
    transactionId: "TXN1001234572"
  },
  {
    id: 1007,
    userId: 6,
    userName: "Sarah Brown",
    type: "recharge",
    amount: 75.00,
    date: "2024-12-04",
    time: "08:10:22",
    status: "completed",
    paymentMethod: "Debit Card",
    transactionId: "TXN1001234573"
  },
  {
    id: 1008,
    userId: 2,
    userName: "Jane Smith",
    type: "purchase",
    amount: -18.00,
    date: "2024-12-04",
    time: "12:22:33",
    status: "completed",
    description: "20 minutes conversation",
    transactionId: "TXN1001234574"
  },
  {
    id: 1009,
    userId: 7,
    userName: "Robert Martinez",
    type: "recharge",
    amount: 40.00,
    date: "2024-12-04",
    time: "13:45:10",
    status: "pending",
    paymentMethod: "Credit Card",
    transactionId: "TXN1001234575"
  },
  {
    id: 1010,
    userId: 5,
    userName: "David Wilson",
    type: "purchase",
    amount: -22.50,
    date: "2024-12-04",
    time: "14:55:44",
    status: "completed",
    description: "25 minutes conversation",
    transactionId: "TXN1001234576"
  }
]

