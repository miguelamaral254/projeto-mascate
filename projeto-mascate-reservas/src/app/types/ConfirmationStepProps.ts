export interface ConfirmationStepProps {
  selectedDate: Date;
  selectedTime: string;
  selectedTable: { type: string; tableID: number; chairs: number } | null;
  onPreviousStep: () => void;
  onSubmit: () => void;
  customerName: string;
  employeeId: number;
}
