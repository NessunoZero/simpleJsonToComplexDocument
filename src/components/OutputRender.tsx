import { Content } from "vanilla-jsoneditor"
import { ContentType, StructureType, validJSON } from './utility'
import { createElement } from "react";
export const ItemRender = ({
  structure,
  item,
}: {
  structure: StructureType;
  item: ContentType;
}) => {
  if (!(item.type in structure)) {
    return null
  } else {

    const itemType = structure[item.type]
    const tagName = itemType.tag
    const className = itemType.className
    const children = (
      typeof item.content === "string" ?
        item.content
        :
        <ItemRender
          item={item.content}
          structure={structure}
        />
    )
    if (["a", "div", "h1", "h2", "h3", "img", "li", "p", "row", "span", "ul"].includes(itemType.tag)) {
      return createElement(tagName, { className, children })
    } else {
      return <></>
    }
  }

}

export const OutputRender = ({
  content,
}: {
  content: Content;
}) => {
  const contents = 'json' in content ? (content.json as validJSON)?.contents ?? [] : []
  const structure = 'json' in content ? (content.json as validJSON)?.structure ?? {} as StructureType : {} as StructureType
  return (
    <>
      {contents.map((item, index) => (
        <ItemRender
          key={index}
          item={item}
          structure={structure}
        />
      ))}
    </>
  )
}