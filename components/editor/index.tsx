"use client";

import { forwardRef, type ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  toolbarPlugin,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertThematicBreak,
  InsertTable,
  InsertCodeBlock,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { useTheme } from "next-themes";
import { basicDark } from "cm6-theme-basic-dark";

import "@mdxeditor/editor/style.css";
import "./dark-editor.css";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
}

// Only import this to the next file
const Editor = forwardRef<MDXEditorMethods, Props & MDXEditorProps>(
  ({ value, fieldChange, ...props }: Props & MDXEditorProps, ref) => {
    const { resolvedTheme } = useTheme();

    const theme = resolvedTheme === "dark" ? [basicDark] : [];

    return (
      <MDXEditor
        key={resolvedTheme}
        className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
        onChange={fieldChange}
        plugins={[
          // Example Plugin Usage
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          imagePlugin(),
          codeBlockPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: "css",
              txt: "txt",
              sql: "sql",
              html: "html",
              saas: "saas",
              scss: "scss",
              bash: "bash",
              json: "json",
              js: "javascript",
              ts: "typescript",
              jsx: "jsx",
              "": "unspecified",
              tsx: "tsx",
              md: "markdown",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => {
              return (
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <UndoRedo />
                          <Separator />

                          <BoldItalicUnderlineToggles />
                          <Separator />

                          <ListsToggle />
                          <Separator />

                          <CreateLink />
                          <InsertImage />
                          <Separator />

                          <InsertTable />
                          <InsertThematicBreak />

                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              );
            },
          }),
        ]}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Editor;
