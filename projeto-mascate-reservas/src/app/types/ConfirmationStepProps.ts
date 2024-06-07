export interface ConfirmationStepProps {
  selectedDate: Date;
  selectedTime: string;
  selectedTable: { type: string; number: number; numChairs: number } | null;
  onPreviousStep: () => void;
  onSubmit: () => void;
  customerName: string;
  employeeId: string;
}
