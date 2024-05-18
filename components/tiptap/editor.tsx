"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "@/components/tiptap/toolbar";

type EditorProps = {
  content: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const Editor = ({ content, onChange, disabled }: EditorProps) => {
  const editor = useEditor({
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none rounded-md min-h-[27rem] md:min-h-80",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-xl font-bold",
          },
          levels: [1],
        },
        paragraph: {
          HTMLAttributes: {
            class:
              "text-[15px] font-normal leading-6 text-okei-primary tracking-normal",
          },
        },
      }),
      Placeholder,
    ],
  });

  return (
    <>
      <Toolbar editor={editor} disabled={disabled} />
      <EditorContent editor={editor} />
    </>
  );
};
