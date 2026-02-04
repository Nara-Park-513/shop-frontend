export type Category = {
  id: number;
  name: string;
  children?: Category[];
};

export const categories: Category[] = [
  {
    id: 1,
    name: "실내자율주행로봇",
    children: [
      { id: 1, name: "서비스/안내형" },
      { id: 2, name: "서빙/배송형" },
      { id: 3, name: "물류/제조형" },
      { id: 4, name: "방역/청소형" },
      { id: 5, name: "가정용" },
    ],
  },
  {
    id: 2,
    name: "실외자율주행로봇",
    children: [
      { id: 1, name: "라스트마일 배송형" },
      { id: 2, name: "순찰/보안형" },
      { id: 3, name: "도로 청소/방역형" },
      { id: 4, name: "특수 산업형" },
    ],
  },
];