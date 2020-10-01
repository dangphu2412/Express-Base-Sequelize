export const extractEnumToArray = Enum => Object.values(Enum);

export const pagination = ({ page = 1, amount = 10 }, items = []) => {
  const limit = parseInt(amount, 10);
  const offset = (parseInt(page, 10) - 1) * parseInt(amount, 10);
  return items.slice(offset, limit + offset);
};
