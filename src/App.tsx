import { useEffect, useState } from "react";
import { JSONManager } from "./components/JSONManager";
import { Content } from "vanilla-jsoneditor";
import { ValidJSON, initialJSON } from "./components/utility";
import { OutputManager } from "./components/OutputManager";
import { OutputRender } from "./components/OutputRender";

function App() {
  const [content, setContent] = useState<Content>({
    json: initialJSON,
    text: undefined,
  });
  const [contentObj, setContentObj] = useState<ValidJSON>(initialJSON);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [showPrintable, setShowPrintable] = useState<boolean>(false);
  useEffect(() => {
    const listener = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  const showOutput = windowWidth > 1300;

  return (
    <>
      {!showPrintable && (
        <div className="w-screen h-screen flex border-box border border-green-700">
          <JSONManager
            content={content}
            setContent={setContent}
            setContentObj={setContentObj}
            setShowPrintable={setShowPrintable}
            showOutput={showOutput}
          />
          {showOutput && (
            <OutputManager
              contentObj={contentObj}
              setShowPrintable={setShowPrintable}
            />
          )}
        </div>
      )}
      {showPrintable && (
        <div
          className="w-screen flex overflow-y-auto items-center"
          onClick={() => setShowPrintable(false)}
        >
          <div id="resume">
            <OutputRender contentObj={contentObj} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
