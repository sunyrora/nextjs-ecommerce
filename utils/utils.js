/**
 *
 * @param {Number} num
 * @returns Number
 * ex) input number 123.4567 => returns 123.46
 */
export const round2 = (num) =>
  Math.round(Number(num) * 100 + Number.EPSILON) / 100;
