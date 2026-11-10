export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string; // YYYY-MM-DD
  totalDaysRead: number;
  unlockedMilestones: number[]; // [3, 7, 14, 21, 30, 40]
}

const STORAGE_KEY_STREAK = 'biblia_streak_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadStreakData(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STREAK);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  return {
    currentStreak: 1,
    longestStreak: 1,
    lastReadDate: getTodayDateString(),
    totalDaysRead: 1,
    unlockedMilestones: [],
  };
}

export function recordDailyReading(): {
  data: StreakData;
  newMilestoneReached: number | null;
} {
  const current = loadStreakData();
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  let newStreak = current.currentStreak;
  let newMilestone: number | null = null;

  if (current.lastReadDate === today) {
    // Already checked in today
    return { data: current, newMilestoneReached: null };
  } else if (current.lastReadDate === yesterday) {
    // Read yesterday, streak continues!
    newStreak += 1;
  } else {
    // Broke streak, reset to 1
    newStreak = 1;
  }

  const newLongest = Math.max(current.longestStreak, newStreak);
  const newTotal = current.totalDaysRead + 1;

  // Check milestone thresholds: 3, 7, 14, 21, 30, 40
  const MILESTONES = [3, 7, 14, 21, 30, 40];
  const unlocked = [...current.unlockedMilestones];
  for (const m of MILESTONES) {
    if (newStreak >= m && !unlocked.includes(m)) {
      unlocked.push(m);
      newMilestone = m;
    }
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastReadDate: today,
    totalDaysRead: newTotal,
    unlockedMilestones: unlocked,
  };

  try {
    localStorage.setItem(STORAGE_KEY_STREAK, JSON.stringify(updated));
  } catch {}

  return { data: updated, newMilestoneReached: newMilestone };
}
