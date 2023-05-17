import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";
import { useEffect, useRef, useState } from "react";

export default function SvelteJSONEditor({
  ...props
}: JSONEditorPropsOptional) {
  const refContainer = useRef(null);
  const [editor, setEditor] = useState<JSONEditor | undefined>(undefined);
  useEffect(() => {
    if (!!refContainer.current && !editor) {
      setEditor(
        new JSONEditor({
          target: refContainer.current,
          props,
        })
      );
    }

    return () => {
      // destroy editor
      if (editor) {
        editor.destroy();
        setEditor(undefined);
      }
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.updateProps(props);
    }
  }, [props]);

  return <div className="flex flex-1 overflow-y-auto" ref={refContainer}></div>;
}
