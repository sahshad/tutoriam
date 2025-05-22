// OtpVerificationDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OtpVerification from "../user/login/otp-verificaion";

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  length?: number;
  initialTimerSeconds?: number;
}

export default function OtpVerificationDialog({
  open,
  onOpenChange,
  email,
  length = 6,
  initialTimerSeconds = 120,
}: OtpVerificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[450px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <OtpVerification
          email={email}
          length={length}
          initialTimerSeconds={initialTimerSeconds}
        />
      </DialogContent>
    </Dialog>
  );
}
