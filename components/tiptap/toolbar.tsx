import { type Editor } from "@tiptap/react";
import { Bold, Heading1, Italic } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

type ToolbarProps = {
  editor?: Editor | null;
  disabled?: boolean;
};

export const Toolbar = ({ editor, disabled }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="absolute right-6 top-2.5 flex items-center space-x-1.5 md:top-3.5 md:mt-6">
      <Toggle
        disabled={disabled}
        aria-label="Toggle Heading"
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        disabled={disabled}
        aria-label="Toggle Bold"
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        disabled={disabled}
        aria-label="Toggle Italic"
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
