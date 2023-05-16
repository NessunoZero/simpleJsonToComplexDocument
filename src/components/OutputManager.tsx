import { OutputRender } from "./OutputRender";
import { ValidJSON } from "./utility";

export const OutputManager = ({
  setShowPrintable,
  contentObj,
}: {
  setShowPrintable: (showPrintable: boolean) => void;
  contentObj: ValidJSON
}) => {
  const onClickDownload = async () => {
    setShowPrintable(true)
  };

  return (
    <div
      className='w-fit grow flex flex-col items-center justify-center space-y-8'
    >
      <div className="w-full border border-orange-700 flex items-center justify-end py-4 px-6">
        <button
          onClick={() => onClickDownload()}
          className="border border-purple-700 p-2 cursor-pointer"
        >
          Printable preview
        </button>
      </div>
      <div className="w-fit flex flex-col grow overflow-y-auto">
        <div
          className="w-[21cm] grow p-[2cm] border border-purple-700 flex flex-col items-center"
        >
          <OutputRender contentObj={contentObj} />
        </div>
      </div>
    </div>
  )
}