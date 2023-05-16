import { ContentType, DataType, StructureType, ValidJSON } from "./utility";
import { createElement } from "react";
export const ItemRender = ({
  structure,
  item,
  data,
}: {
  structure: StructureType;
  item: ContentType;
  data: DataType;
}) => {
  if (!(item.type in structure)) {
    alert(`"${item.type}" is not a component name`);
    return null;
  } else {
    const itemType = structure[item.type];
    const tagName = itemType.tag;
    const className = itemType.className;
    const children =
      typeof item.content === "string"
        ? item.content
        : item.content.map((item, key) => (
            <ItemRender
              item={item}
              structure={structure}
              key={key}
              data={data}
            />
          ));
    if (
      ["a", "div", "h1", "h2", "h3", "li", "p", "row", "span", "ul"].includes(
        itemType.tag
      )
    ) {
      return createElement(tagName, { className, children });
    } else if (
      "img" === itemType.tag &&
      typeof item.content === "string" &&
      item.content in data
    ) {
      return createElement(tagName, { className, src: data[item.content] });
    } else {
      return <></>;
    }
  }
};

export const OutputRender = ({ contentObj }: { contentObj: ValidJSON }) => {
  const contents = contentObj.contents ?? {};
  const structure = contentObj.structure ?? {};
  const data = contentObj.data ?? {};
  return (
    <>
      {contents.map((item, index) => (
        <ItemRender key={index} item={item} structure={structure} data={data} />
      ))}
    </>
  );
};
