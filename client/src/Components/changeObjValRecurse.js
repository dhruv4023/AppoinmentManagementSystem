export const changeValObj = (old, ky, nevl) => {
  Object.keys(old).forEach((e) => {
    if (typeof old[e] === "object") changeValObj(old[e], ky, nevl);
    else {
      if (e === ky) old[e] = nevl;
    }
  });
  return old;
};
