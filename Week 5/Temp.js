function addMainStyle(button, fontSize, fontWeight) {
  button.style("border-radius: 15px");
  button.style("border-width: 5px");
  button.style("background-color", buttonColor);
  button.style("font-family: Italic");
  button.style(`font-size`, fontSize + "px");
  button.style("color", buttonTextColor);
  button.style("webkit-text-stroke: 1px rgb(0, 0, 0)");

  if (fontWeight) {
    button.style("font-weight", fontWeight);
  }
}