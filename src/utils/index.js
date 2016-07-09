
import slug from 'slug';
slug.defaults.mode = 'pretty';
slug.defaults.modes.pretty.lower = true;

export const slugMe = (val) => slug(val);

export const findInObj = (obj, val) => {
  const re = new RegExp(val, 'i');
  return !!Object.keys(obj).filter(item => {
    if (typeof obj[item] === 'object') return findInObj(obj[item], val);
    return obj[item].match(re);
  }).length;
};


// export const slug = (str) => str.replace(/\s/g, '-').toLowerCase();
