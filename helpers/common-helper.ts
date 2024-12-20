export const currencySigns = {
  dolar: "$",
  euro: "€",
};

export const displayAmount = (balance: number): string => {
  return balance.toLocaleString("en-US", { minimumFractionDigits: 2 });
};

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};
