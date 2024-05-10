import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalWrapperProps = {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  children: React.ReactNode;
};

export const ModalWrapper = ({
  open,
  onOpenChange,
  title,
  children,
}: ModalWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div>
        <DialogContent className="flex h-full max-w-2xl flex-col md:max-h-96">
          <div className="absolute -top-16 right-1/2 hidden translate-x-1/2 translate-y-1/2 text-white md:block">
            <span className="font-semibold">{title}</span>
          </div>
          <DialogHeader className="md:hidden">
            <DialogTitle className="text-center text-base font-bold text-okei-primary">
              {title}
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </div>
    </Dialog>
  );
};
