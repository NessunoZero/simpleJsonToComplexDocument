import VanillaJSONEditor from "./VanillaJSONEditor";
import { Content, JSONContent, TextContent } from "vanilla-jsoneditor";
import { ValidJSON, initialJSON } from "./utility";
import { Button, buttonClassName } from "./Button";

export const JSONManager = ({
  content,
  setContent,
  setShowPrintable,
  showOutput,
  setContentObj,
}: {
  content: Content;
  setContent: (content: Content) => void;
  setShowPrintable: (showPrintable: boolean) => void;
  showOutput: boolean;
  setContentObj: (content: ValidJSON) => void;
}) => {
  const onClickDownload = () => {
    var data =
      "json" in content
        ? JSON.stringify((content as JSONContent)?.json, undefined, 2)
        : (content as TextContent).text;
    const blob = new Blob([data], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.setAttribute("href", href);
    a.setAttribute(
      "download",
      (((content as JSONContent)?.json as any)?.["title"] ?? "myTemplate") +
        ".json"
    );

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="border border-red-700 flex flex-col space-y-8 grow">
      <div className="w-full border border-orange-700 flex items-center justify-between py-4 px-6 whitespace-nowrap flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label htmlFor="jsonFile">
            <div className={buttonClassName}>
              Upload JSON
            </div>
          </label>
          <input
            id="jsonFile"
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              !!e.target?.files?.[0] &&
                fileReader.readAsText(e.target?.files?.[0], "UTF-8");
              fileReader.onload = (e) => {
                try {
                  const newJSON =
                    e.target?.result && JSON.parse(e.target?.result as string);
                  if (newJSON) {
                    setContent({
                      json: newJSON,
                    });
                    setContentObj(newJSON);
                  }
                } catch (e) {
                  console.error(e);
                }
              };
            }}
            value={""}
            className="cursor-pointer hidden"
            accept="application/JSON"
          />
          <label htmlFor="imgFile">
            <div className={buttonClassName}>
              Upload Image
            </div>
          </label>
          <input
            id="imgFile"
            type="file"
            onChange={(e) => {
              if (!e.target.files?.[0]) {
                return false;
              }
              const fileName = e.target.files?.[0].name;
              const fileReader = new FileReader();
              fileReader.onload = (e) => {
                try {
                  const result = e.target?.result;
                  if (!result) {
                    return;
                  }
                  let jsonToUpdate;
                  if ("text" in content && !!content["text"]) {
                    try {
                      jsonToUpdate = JSON.parse(content["text"]);
                    } catch (e) {
                      console.error(e);
                      jsonToUpdate = initialJSON;
                    }
                  } else if ("json" in content && !!content["json"]) {
                    jsonToUpdate = content.json;
                  } else {
                    jsonToUpdate = initialJSON;
                  }
                  if (!("data" in jsonToUpdate)) {
                    jsonToUpdate.data = {};
                  }
                  jsonToUpdate.data[fileName] = result;
                  setContent({ json: jsonToUpdate });
                  setContentObj(jsonToUpdate);
                } catch (e) {
                  console.error(e);
                }
              };
              fileReader.readAsDataURL(e.target?.files?.[0]);
            }}
            value={""}
            className="cursor-pointer hidden"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            onClick={() => {
              try {
                setContentObj(JSON.parse((content as TextContent).text));
              } catch (e) {
                try {
                  const json = (content as JSONContent).json;
                  json && setContentObj(json as unknown as ValidJSON);
                } catch (e) {
                  console.error(e);
                }
                if ("text" in content && !!content.text) {
                  alert("not a valid json");
                }
              }
            }}
            content="Reload from json"
          />
          {!showOutput && (
            <Button
              onClick={() => setShowPrintable(true)}
              content="Printable preview"
            />
          )}
          <Button onClick={() => onClickDownload()} content="Download" />
        </div>
      </div>
      <VanillaJSONEditor
        content={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />
    </div>
  );
};
