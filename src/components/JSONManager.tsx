import { useState } from "react";
import VanillaJSONEditor from "./VanillaJSONEditor"
import { Content, JSONContent, TextContent } from "vanilla-jsoneditor";


export const JSONManager = () => {

  const [content, setContent] = useState<Content>({
    json: {
      title: "My awesome Doc",
      contents: [
      ]
    },
    text: undefined
  });

  const onClickDownload = () => {
    var data = (
      'json' in content ?
        JSON.stringify((content as JSONContent)?.json, undefined, 2)
        :
        (content as TextContent).text
    );
    const blob = new Blob([data], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    var a = document.createElement('a');
    console.log(data)
    a.setAttribute("href", href);
    a.setAttribute("download", (((content as JSONContent)?.json as any)?.["title"] ?? "myTemplate") + ".json");

    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div
      className='border border-red-700 flex flex-col space-y-8'
    >
      <div className="w-full h-10 border border-orange-700 flex items-center justify-between">
        <input
          type="file"
          onChange={e => {
            const fileReader = new FileReader();
            !!e.target?.files?.[0] && fileReader.readAsText(e.target?.files?.[0], "UTF-8");
            fileReader.onload = e => {
              console.log("e.target.result", e.target?.result);
              try{
                const newJSON = e.target?.result && JSON.parse(e.target?.result as string)
                if(newJSON){
                  setContent({
                    json: newJSON
                  })
                }
              }catch(e){
                console.log(e)
              }
            };
          }}
          value={""}
          className="cursor-pointer"
        >
        </input>
        <button
          onClick={() => onClickDownload()}
          className="border border-purple-700 p-2 cursor-pointer"
        >
          Download
        </button>
      </div>
      <VanillaJSONEditor
        content={content}
        onChange={newContent => setContent(newContent)}
      />
    </div>
  )
}