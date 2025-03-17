// Select DOM Elements
const metricOpt = document.getElementById("metric");
const imperialOpt = document.getElementById("imperial");

const metricHeight = document.getElementById("metric-height");
const metricWeight = document.getElementById("metric-weight");

const imperialFieldsContainer = document.querySelector(
  ".imperial_input-wrapper",
);
const metricFieldsContainer = document.querySelector(".metric_input-wrapper");

[metricOpt, imperialOpt].forEach((opt) => {
  opt.addEventListener("click", () => {
    if (opt.id === "metric") {
      console.log("metric clicked!");
      imperialFieldsContainer.classList.add("d-none");
      imperialFieldsContainer.classList.remove("d-flex");
      metricFieldsContainer.classList.add("d-flex");
    } else if (opt.id === "imperial") {
      console.log("imperial clicked!");
      imperialFieldsContainer.classList.add("d-flex");
      imperialFieldsContainer.classList.remove("d-none");
      metricFieldsContainer.classList.add("d-none");
      metricFieldsContainer.classList.remove("d-flex");
    }
  });
});
