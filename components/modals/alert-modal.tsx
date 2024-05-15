import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="rounded-none px-10 py-7 text-base"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-none border-l-0 px-10 py-7 text-base font-bold text-destructive hover:text-destructive"
          >
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
