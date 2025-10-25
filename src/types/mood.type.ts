export type MOODRECORD = {
  todayMood: {
    index: number;
    detail: string;
  };
  tagFeels: string[];
  todayDetail: string;
  minSleepHour: number;
  maxSleepHour: number;
  date: Date;
};
