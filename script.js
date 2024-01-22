function calculateWalkingCarbonFootprint(distance) {
  // Assuming the carbon footprint for walking is negligible
  return 0;
}

function calculateCarCarbonFootprint(distance) {
  const co2PerLiter = 2.31; // kg CO2 per liter of gasoline
  const fuelEfficiency = 10; // km per liter
  console.log((distance / fuelEfficiency) * co2PerLiter)
  return (distance / fuelEfficiency) * co2PerLiter;
}

function calculatePublicTransportCarbonFootprint(distance) {
  // Assuming 0.05 kg CO2 per passenger per km
  const co2PerKmPerPassenger = 0.05;

  return distance * co2PerKmPerPassenger;
}

function calculateFoodCarbonFootprint(activity, servings) {
  // This function needs to be defined based on food type
  return servings * 1.5; // Placeholder value
}

function calculateCarbonFootprint() {
  console.log("inside calculateCarbonFootprint");
  var activity = document.getElementById("activity").value.toLowerCase();
  var activityType = document.getElementById("activityType").value.toLowerCase();

  toggleInputFields(activityType);

  if (activityType === "food") {
    var servings = parseFloat(document.getElementById("servings").value);
    var foodFootprint = calculateFoodCarbonFootprint(activity, servings);
    displayOutput(
      "Your carbon footprint for " + activity + " consumption is " + foodFootprint.toFixed(3) + " kgCO2e."
    );
  } else if (activityType === "transportation") {
    var distance = parseFloat(document.getElementById("distance").value);

    if (activity === "walking") {
      var walkingFootprint = calculateWalkingCarbonFootprint(distance);
      displayOutput(
        "Your carbon footprint for walking " + distance + " km is " + walkingFootprint.toFixed(3) + " kgCO2e."
      );
    } else if (activity === "car") {
      var carFootprint = calculateCarCarbonFootprint(distance);
      displayOutput(
        "Your carbon footprint for driving a car for " + distance + " km is " + carFootprint.toFixed(3) + " kgCO2e."
      );
    } else if (activity === "public transport") {
      var publicTransportFootprint = calculatePublicTransportCarbonFootprint(distance);
      displayOutput(
        "Your carbon footprint for using public transport for " + distance + " km is " + publicTransportFootprint.toFixed(3) + " kgCO2e."
      );
    } else {
      displayOutput('Invalid activity for transportation. Please enter a valid activity such as "walking", "car", or "public transport".');
    }
  } else {
    displayOutput('Invalid activity type. Please select a valid activity type ("food" or "transportation").');
  }
}



function toggleInputFields(activityType) {
  var distanceInput = document.getElementById("distanceInput");
  var servingsInput = document.getElementById("servingsInput");

  if (activityType === "transportation") {
    distanceInput.style.display = "block";
    servingsInput.style.display = "none";
  } else if (activityType === "food") {
    distanceInput.style.display = "none";
    servingsInput.style.display = "block";
  } else {
    distanceInput.style.display = "none";
    servingsInput.style.display = "none";
  }
}

function displayOutput(output) {
  var outputSection = document.getElementById("outputSection");
  var carbonOutput = document.getElementById("carbonOutput");

  // Display the output section
  outputSection.style.display = "block";

  // Set the carbon footprint result
  carbonOutput.textContent = output;
}

function updateActivityOptions(selectedType) {
  var activitySelect = document.getElementById('activity');
  activitySelect.innerHTML = ''; // Clear existing options

  if (selectedType === 'transportation') {
    var transportOptions = ['Walking', 'Car', 'Public Transport'];
    transportOptions.forEach(function (option) {
      var opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.innerHTML = option;
      activitySelect.appendChild(opt);
    });
  } else if (selectedType === 'food') {
    var foodOptions = ['Vegetables', 'Meat', 'Dairy', 'Seafood'];
    foodOptions.forEach(function (option) {
      var opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.innerHTML = option;
      activitySelect.appendChild(opt);
    });
  }
  toggleInputFields(selectedType);
}
