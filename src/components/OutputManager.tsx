import { useRef } from "react";
import { Content, JSONContent } from "vanilla-jsoneditor"
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { OutputRender } from "./OutputRender";

export const OutputManager = ({
  content,
}: {
  content: Content;
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const onClickDownload = async () => {
    if (!ref.current) {
      return;
    }
    let canvas = await html2canvas(ref.current, {})
    if (!canvas) {
      alert('fuck off')
      return;
    }
    // Convert the iframe into a PNG image using canvas.
    let imgData = canvas.toDataURL("image/png");

    // Create a PDF document and add the image as a page.
    const doc = new JsPDF({
      format: "a4",
      unit: "mm",
    });
    doc.addImage(imgData, "PNG", 0, 0, 210, 297);

    // Get the file as blob output.
    let blob = doc.output("blob");
    // Just download it
    const href = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.setAttribute("href", href);
    a.setAttribute("download", (((content as JSONContent)?.json as any)?.["title"] ?? "myTemplate") + ".json");

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      className='w-fit h-full flex flex-col items-center justify-center space-y-8'
    >
      <div className="w-full h-10 border border-orange-700 flex items-center justify-end">
        <button
          onClick={() => onClickDownload()}
          className="border border-purple-700 p-2 cursor-pointer"
        >
          Download
        </button>
      </div>
      <div className="w-fit flex flex-col grow overflow-y-auto">
        <div
          className="w-[21cm] min-h-[29.7cm] p-[2cm] border border-purple-700"
          ref={ref}
        >
          <OutputRender content={content} />
        </div>
      </div>
    </div>
  )
}