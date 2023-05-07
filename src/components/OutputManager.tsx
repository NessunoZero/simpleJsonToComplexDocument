import { Content, JSONContent, TextContent } from "vanilla-jsoneditor"

export const OutputManager = ({
  content,
}: {
  content: Content;
}) => {
  const stringToShow = (
    'json' in content ?
      JSON.stringify((content as JSONContent)?.json, undefined, 2)
      :
      (content as TextContent).text
  );

  const onClickDownload = () => {

  }

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center space-y-8'
    >
      <div className="w-full h-10 border border-orange-700 flex items-center justify-between">
        <button
          onClick={() => onClickDownload()}
          className="border border-purple-700 p-2 cursor-pointer"
        >
          Download
        </button>
      </div>
      <div
        className="max-w-[800px] h-full"
      >
        {stringToShow}
      </div>
    </div>
  )
}