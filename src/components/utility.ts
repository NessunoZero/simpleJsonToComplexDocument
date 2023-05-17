export const buttonClassName =
  "border border-purple-700 p-2 cursor-pointer rounded-full";

export type TagType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "ul"
  | "li"
  | "row"
  | "div"
  | "img"
  | "a"
  | "span";

export type DataType = {
  [key: string]: string;
};

export type ExtendedDataType = {
  [key: string]: string | ContentType[];
};

export type ReuseStructureItem = {
  type: string;
  data: DataType;
};

export type StructureType = {
  [key: string]: {
    tag: TagType;
    className?: string;
    data?: string[];
    children?: ReuseStructureItem[];
  };
};

export type ContentType = {
  type: string;
  data?: ExtendedDataType;
};

export type ValidJSON = {
  title: string;
  contents: ContentType[];
  structure: StructureType;
  data: DataType;
};

export const initialJSON: ValidJSON = {
  title: "My awesome Doc",
  contents: [
    {
      type: "title",
      data: {
        content:
          "Until now this default document is all provided documentation",
      },
    },
    {
      type: "twoSides",
      data: {
        left: "test left",
        right: "test right",
      },
    },
    {
      type: "justifyBetween",
      data: {
        children: [
          { type: "oneChild", data: { content: "left" } },
          { type: "oneChild", data: { content: "center" } },
          { type: "oneChild", data: { content: "right" } },
        ],
      },
    },
    {
      type: "titleLeftRight",
      data: {
        title: "test componible component",
        left: "test to left",
        right: "test to right",
      },
    },
    {
      type: "composableTitle",
      data: {
        title: "test title with composable",
        children: [
          { type: "oneChild", data: { content: "left" } },
          { type: "oneChild", data: { content: "center" } },
          { type: "oneChild", data: { content: "right" } },
        ],
      },
    },
  ],
  structure: {
    title: {
      tag: "h1",
      className: "uppercase text-center text-xl p-0 m-0 text-black",
    },
    twoSides: {
      tag: "div",
      className: "w-full flex items-center justify-between",
      data: ["left", "right"],
      children: [
        {
          type: "oneChild",
          data: { content: "left" },
        },
        {
          type: "oneChild",
          data: { content: "right" },
        },
      ],
    },
    oneChild: {
      tag: "p",
      className: "capitalize",
    },
    justifyBetween: {
      tag: "div",
      className: "w-full flex items-center justify-between",
    },
    titleLeftRight: {
      tag: "div",
      className: "w-full flex flex-col items-center gap-4",
      data: ["title", "left", "right"],
      children: [
        {
          type: "title",
          data: { content: "title" },
        },
        {
          type: "twoSides",
          data: { left: "left", right: "right" },
        },
      ],
    },
    composableTitle: {
      tag: "div",
      className: "w-full flex flex-col items-center gap-4",
      data: ["title", "children"],
      children: [
        {
          type: "title",
          data: { content: "title" },
        },
        {
          type: "justifyBetween",
          data: { children: "children" },
        },
      ],
    },
  },
  data: {},
};
