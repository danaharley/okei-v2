import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

type ModalWrapperProps = {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const ModalWrapper = ({
  open,
  onOpenChange,
  title,
  children,
  className,
}: ModalWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex h-full max-w-2xl flex-col p-0 md:max-h-[36rem]",
          className,
        )}
      >
        <div className="absolute -top-16 right-1/2 hidden translate-x-1/2 translate-y-1/2 text-white md:block">
          <span className="font-semibold">{title}</span>
        </div>
        <DialogHeader className="md:hidden">
          <DialogTitle className="mt-3 text-center text-base font-bold text-okei-primary md:mt-0">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
