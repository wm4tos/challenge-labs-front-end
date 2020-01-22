export const validateProps = (obj, ...props) => props
  .map(prop => Object.prototype.hasOwnProperty.call(obj, prop))
  .some(x => x);
