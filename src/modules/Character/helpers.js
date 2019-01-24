export const sortByHasDemonstration = (a, b) => {
  if (a.demonstration && b.demonstration) {
    return 0;
  } else if (a.demonstration) {
    return -1;
  } else {
    return 1;
  }
};
