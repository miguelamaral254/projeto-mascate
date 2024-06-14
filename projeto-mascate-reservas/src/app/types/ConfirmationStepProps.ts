export interface ConfirmationStepProps {
  selectedDate: Date;
  selectedTime: string;
  selectedTable: { tableID: number; chairs: number } | null;
  onPreviousStep: () => void;
  onSubmit: () => void;
  customerName: string;
  employeeId: number;
}
