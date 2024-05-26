import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "../ui/separator";

type AlertModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
};

export const AlertModal = ({
  open,
  onCancel,
  onConfirm,
  title,
}: AlertModalProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-fit gap-0 overflow-hidden p-0">
        <AlertDialogHeader className="space-y-0 px-10 py-5">
          <AlertDialogTitle className="text-center text-lg font-semibold tracking-tight text-okei-primary">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Separator className="bg-okei-secondary/30" />
        <div className="flex items-center hover:cursor-pointer">
          <div
            className="flex h-14 w-full items-center justify-center px-8 hover:bg-okei-secondary/10"
            onClick={onCancel}
          >
            Cancel
          </div>
          <Separator orientation="vertical" className="bg-okei-secondary/30" />
          <div
            className="flex h-14 w-full items-center justify-center px-8 font-semibold text-destructive hover:bg-okei-secondary/10"
            onClick={onConfirm}
          >
            Discard
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
