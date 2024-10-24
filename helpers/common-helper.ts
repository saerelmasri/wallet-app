import images from "@/constants/images";

export const currencySigns = {
  dolar: "$",
  euro: "€",
};

export const cardDesign = {
  "#2F7E79": images.cardColor1,
  "#32D74B": images.cardColor3,
  "#05603A": images.cardColor2,
  "#D3D3D3": images.cardColor5,
  "#000000": images.cardColor4,
};

export const displayAmount = (balance: number): string => {
  return balance.toLocaleString("en-US", { minimumFractionDigits: 2 });
};
