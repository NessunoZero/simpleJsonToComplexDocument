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
    const children = itemType.children;
    const content = "content" in item.data ? item.data.content : undefined;
    const dataRefer =
      "dataRefer" in item.data ? item.data.dataRefer : undefined;
    if (children && itemType.tag === "img") {
      alert(`img tag could not have children check ${item.type} in structure`);
      return null;
    } else {
      if (
        ["a", "div", "h1", "h2", "h3", "li", "p", "row", "span", "ul"].includes(
          itemType.tag
        )
      ) {
        if (!children) {
          return createElement(tagName, { className, children: content });
        } else {
          const trueChildren = children.map((child, index) => {
            const childData = Object.entries(child.data).reduce(
              (acc, [key, value]) => {
                if (!(value in item.data)) {
                  return acc;
                } else {
                  acc[key] = item.data[value];
                }
                return acc;
              },
              {} as DataType
            );
            return (
              <ItemRender
                structure={structure}
                item={{
                  data: childData,
                  type: child.type,
                }}
                data={data}
                key={index}
              />
            );
          });
          return createElement(tagName, { className, children: trueChildren });
        }
      } else if ("img" === itemType.tag) {
        if (!dataRefer) {
          alert(`dataRefer is needed for img tag`);
          return null;
        }
        if (!(dataRefer in data)) {
          alert(`${dataRefer} is not in data of input JSON`);
          return null;
        }
        return createElement(tagName, { className, src: data[dataRefer] });
      }
    }
    return <></>;
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
