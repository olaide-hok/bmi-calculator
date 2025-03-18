// Select DOM Elements
const metricOpt = document.getElementById("metric");
const imperialOpt = document.getElementById("imperial");

const metricFieldsContainer = document.querySelector(".metric_input-wrapper");
const metricHeightInput = document.getElementById("metric-height");
const metricWeightInput = document.getElementById("metric-weight");

const imperialFieldsContainer = document.querySelector(
  ".imperial_input-wrapper",
);
const imperialHeightFtInput = document.getElementById("imperial-height-ft");
const imperialHeightInInput = document.getElementById("imperial-height-in");
const imperialWeightStInput = document.getElementById("imperial-weight-st");
const imperialWeightLbsInput = document.getElementById("imperial-weight-lbs");

const welcomeTextContainer = document.querySelector(".welcome-text");
const calculatedResultContainer = document.querySelector(".calculated");

let unitSystemToUse = "metric";
// Toggle visibility for either metric or imperial unit system
[(metricOpt, imperialOpt)].forEach((opt) => {
  opt.addEventListener("click", () => {
    if (opt.id === "metric") {
      unitSystemToUse = "metric";
      imperialFieldsContainer.classList.add("d-none");
      imperialFieldsContainer.classList.remove("d-flex");
      metricFieldsContainer.classList.add("d-flex");
    } else if (opt.id === "imperial") {
      unitSystemToUse = "imperial";
      imperialFieldsContainer.classList.add("d-flex");
      imperialFieldsContainer.classList.remove("d-none");
      metricFieldsContainer.classList.add("d-none");
      metricFieldsContainer.classList.remove("d-flex");
    }
  });
});

function convertToStonesAndPounds(stones) {
  let wholeStones = Math.floor(stones); // Get the whole number part (stones)
  let remainingPounds = (stones - wholeStones) * 14; // Convert decimal to pounds

  return `${wholeStones}st ${Math.floor(remainingPounds)}lbs`;
}

function calculateBMI(
  unitSystem,
  height,
  weight,
  heightInches = 0,
  weightLbs = 0,
) {
  let bmi;
  let heightInMeters;
  let weightInKg;

  // Convert height and weight to metric units (kg and meters)
  if (unitSystem === "metric") {
    heightInMeters = height / 100; // Convert cm to meters
    weightInKg = weight;
  } else if (unitSystem === "imperial") {
    // Convert height (ft and inches) to meters
    heightInMeters = (height * 12 + heightInches) * 0.0254; // 1 foot = 12 inches, 1 inch = 0.0254 meters
    // Convert weight (st and lbs) to kg
    weightInKg = (weight * 14 + weightLbs) * 0.453592; // 1 stone = 14 lbs, 1 lb = 0.453592 kg
  } else {
    throw new Error("Invalid unit system. Use 'metric' or 'imperial'.");
  }

  // Calculate BMI
  bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

  // Determine weight classification
  let classification;
  if (unitSystem === "metric") {
    if (bmi < 18.5) {
      classification = "underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      classification = "healthy weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      classification = "overweight";
    } else {
      classification = "obese";
    }
  } else if (unitSystem === "imperial") {
    if (bmi < 22.9) {
      classification = "underweight";
    } else if (bmi >= 22.0 && bmi <= 29.9) {
      classification = "healthy weight";
    } else if (bmi >= 30 && bmi <= 34.9) {
      classification = "overweight";
    } else {
      classification = "obese";
    }
  }

  // Calculate healthy weight range
  const minHealthyWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(
    1,
  );
  const maxHealthyWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(
    1,
  );

  const x = (height * 12 + heightInches) * (height * 12 + heightInches);

  const minHealthyWeightImperial = convertToStonesAndPounds(
    minHealthyWeight * 0.157473,
  );
  const maxHealthyWeightImperial = convertToStonesAndPounds(
    maxHealthyWeight * 0.157473,
  );

  return {
    bmi: parseFloat(bmi),
    classification,
    healthyWeightRange: `${minHealthyWeight}kgs - ${maxHealthyWeight}kgs`,
    healthyWeightRangeImperial: `${minHealthyWeightImperial} - ${maxHealthyWeightImperial}`,
  };
}

const updateResultView = (bmiValue, classify, range) => {
  welcomeTextContainer.classList.add("d-none");
  welcomeTextContainer.classList.remove("d-flex");
  calculatedResultContainer.classList.add("d-flex");
  calculatedResultContainer.classList.remove("d-none");
  calculatedResultContainer.innerHTML = `
       <div class="bmi-value">
          <p class="text-preset-6-semiBold">Your BMI is ...</p>
          <p class="value">${bmiValue}</p>
      </div>
      <p class="classification-range text-preset-7-regular">
          Your BMI suggests you’re a ${classify}. Your ideal weight
            is between <span class="text-preset-7-bold"> ${range}.</span>
      </p>
    `;
};

metricWeightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const metricHeightValue = parseFloat(metricHeightInput.value.trim());
    const metricWeightValue = parseFloat(metricWeightInput.value.trim());

    if (!isNaN(metricHeightValue) && !isNaN(metricWeightValue)) {
      const { bmi, classification, healthyWeightRange } = calculateBMI(
        unitSystemToUse,
        metricHeightValue,
        metricWeightValue,
      );
      updateResultView(bmi, classification, healthyWeightRange);

      console.log(
        calculateBMI(unitSystemToUse, metricHeightValue, metricWeightValue),
      );
    }
  }
});

imperialWeightLbsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const imperialHeightFtValue = parseFloat(
      imperialHeightFtInput.value.trim(),
    );
    const imperialHeightInValue = parseFloat(
      imperialHeightInInput.value.trim(),
    );
    const imperialWeightStValue = parseFloat(
      imperialWeightStInput.value.trim(),
    );
    const imperialWeightLbsValue = parseFloat(
      imperialWeightLbsInput.value.trim(),
    );

    if (!isNaN(imperialHeightFtValue) && !isNaN(imperialWeightStValue)) {
      const { bmi, classification, healthyWeightRangeImperial } = calculateBMI(
        unitSystemToUse,
        imperialHeightFtValue,
        imperialWeightStValue,
        imperialHeightInValue,
        imperialWeightLbsValue,
      );
      updateResultView(bmi, classification, healthyWeightRangeImperial);
    }
  }
});
