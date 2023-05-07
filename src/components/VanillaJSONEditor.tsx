import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";
import { useEffect, useRef, useState } from "react";

export default function SvelteJSONEditor(props: JSONEditorPropsOptional) {
  const refContainer = useRef(null);
  const [editor, setEditor] = useState<JSONEditor | undefined>(undefined)

  useEffect(() => {
    console.log('init component')
    if (!!refContainer.current && !editor) {
      // create editor
      console.log("create editor", refContainer.current);
      setEditor(new JSONEditor({
        target: refContainer.current,
        props
      }));
    }

    return () => {
      // destroy editor
      if (editor) {
        console.log("destroy editor");
        editor.destroy();
        setEditor(undefined)
      }
    };
  }, []);

  useEffect(() => {
    if(!!editor){
      editor.updateProps(props)
    }
  }, [props])

  return <div className="flex flex-1" ref={refContainer}></div>;
}
