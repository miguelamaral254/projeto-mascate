import { TableAvailability } from "../types/table";
import tableAvailability from "../data/tableAvailability"

const fetchAvailableTimes = (date: string): string[] => {
  const availabilityForDate = tableAvailability[date];
  if (!availabilityForDate) return [];
  
  return Object.keys(availabilityForDate);
};

export default fetchAvailableTimes;
