module.exports = (template, element) => {
  let output = template.replace(/{%TITLE%}/g, element.title);
  output = output.replace(/{%ID%}/g, element.id);
  output = output.replace(/{%POSTER%}/g, element.poster);
  output = output.replace(/{%GENRE%}/g, element.genre);
  output = output.replace(/{%DIRECTOR%}/g, element.director);
  output = output.replace(/{%YEAR%}/g, element.year);
  output = output.replace(/{%RATING%}/g, element.rating);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);
  if (element.rating > 8.5) {
    output = output.replace(/{%TOP_RATED%}/g, "top-rated");
  }
  return output;
};
