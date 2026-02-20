module.exports = (template, element) => {
  let output = template.replace(/{%productName%}/g, element.productName);
  output = output.replace(/{%productImage%}/g, element.image);
  output = output.replace(/{%quantity%}/g, element.quantity);
  output = output.replace(/{%price%}/g, element.price);
  output = output.replace(/{%from%}/g, element.from);
  output = output.replace(/{%nutrients%}/g, element.nutrients);
  output = output.replace(/{%ID%}/g, element.id);
  output = output.replace(/{%description%}/g, element.description);
  if (!element.organic) {
    output = output.replace(/{%notOrganic%}/g, "not-organic");
  }
  return output;
};
