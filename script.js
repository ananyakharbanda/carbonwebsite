function calculateWalkingCarbonFootprint(distance) {
  // Average carbon footprint for walking (considering factors like diet, body weight, etc.)
  // This value may vary, but for general purposes, we assume it to be 0.05 kg CO2 per km
  const co2PerKm = 0.05; // kg CO2 per km
  return distance * co2PerKm;
}

function calculateCarCarbonFootprint(distance, fuelEfficiency, co2PerLiter) {
  // Calculate carbon footprint based on distance, fuel efficiency, and CO2 emissions per liter of fuel
  return (distance / fuelEfficiency) * co2PerLiter;
}

function calculatePublicTransportCarbonFootprint(
  distance,
  passengers,
  co2PerKmPerPassenger
) {
  // Calculate carbon footprint based on distance and the number of passengers
  return distance * co2PerKmPerPassenger * passengers;
}

function calculateFoodCarbonFootprint(foodType, servings) {
  // Carbon footprint calculation based on the food type and servings consumed
  // Approximate values based on general data
  const carbonFootprints = {
    vegetables: 0.2, // kgCO2e per serving
    meat: 6.9, // kgCO2e per serving
    dairy: 2.5, // kgCO2e per serving
    seafood: 5.7, // kgCO2e per serving
  };

  // Check if the food type is valid, if not, return 0
  if (carbonFootprints.hasOwnProperty(foodType)) {
    return servings * carbonFootprints[foodType];
  } else {
    return 0;
  }
}

function calculateCarbonFootprint() {
  console.log("inside calculateCarbonFootprint");
  var activity = document.getElementById("activity").value.toLowerCase();
  var activityType = document
    .getElementById("activityType")
    .value.toLowerCase();

  toggleInputFields(activityType);

  if (activityType === "food") {
    var servings = parseFloat(document.getElementById("servings").value);
    var foodFootprint = calculateFoodCarbonFootprint(activity, servings);
    displayOutput(
      "Your carbon footprint for " +
        activity +
        " consumption is " +
        foodFootprint.toFixed(3) +
        " kgCO2e."
    );
  } else if (activityType === "transportation") {
    var distance = parseFloat(document.getElementById("distance").value);

    if (activity === "walking") {
      var walkingFootprint = calculateWalkingCarbonFootprint(distance);
      displayOutput(
        "Your carbon footprint for walking " +
          distance +
          " km is " +
          walkingFootprint.toFixed(3) +
          " kgCO2e."
      );
    } else if (activity === "car") {
      var fuelEfficiency = 10; // km per liter
      var co2PerLiter = 2.31; // kg CO2 per liter of gasoline
      var carFootprint = calculateCarCarbonFootprint(
        distance,
        fuelEfficiency,
        co2PerLiter
      );
      displayOutput(
        "Your carbon footprint for driving a car for " +
          distance +
          " km is " +
          carFootprint.toFixed(3) +
          " kgCO2e."
      );
    } else if (activity === "public transport") {
      var passengers = 1; // Assuming 1 passenger by default
      var co2PerKmPerPassenger = 0.05; // kg CO2 per passenger per km
      var publicTransportFootprint = calculatePublicTransportCarbonFootprint(
        distance,
        passengers,
        co2PerKmPerPassenger
      );
      displayOutput(
        "Your carbon footprint for using public transport for " +
          distance +
          " km is " +
          publicTransportFootprint.toFixed(3) +
          " kgCO2e."
      );
    } else {
      displayOutput(
        'Invalid activity for transportation. Please enter a valid activity such as "walking", "car", or "public transport".'
      );
    }
  } else {
    displayOutput(
      'Invalid activity type. Please select a valid activity type ("food" or "transportation").'
    );
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
  var activitySelect = document.getElementById("activity");
  activitySelect.innerHTML = ""; // Clear existing options

  if (selectedType === "transportation") {
    var transportOptions = ["Walking", "Car", "Public Transport"];
    transportOptions.forEach(function (option) {
      var opt = document.createElement("option");
      opt.value = option.toLowerCase();
      opt.innerHTML = option;
      activitySelect.appendChild(opt);
    });
  } else if (selectedType === "food") {
    var foodOptions = ["Vegetables", "Meat", "Dairy", "Seafood"];
    foodOptions.forEach(function (option) {
      var opt = document.createElement("option");
      opt.value = option.toLowerCase();
      opt.innerHTML = option;
      activitySelect.appendChild(opt);
    });
  }
  toggleInputFields(selectedType);
}
