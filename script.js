function calculateBMI() {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const weightInput = document.getElementById("weight").value;
    const heightInput = document.getElementById("height").value;

    let bmi = 0;
    let weight = parseFloat(weightInput);
    let height = parseFloat(heightInput);

    if (unit === "metric") {
        height = height / 100; // cm to m
        bmi = weight / (height * height);
    } else {
        // imperial conversion: height in inches, weight in pounds
        bmi = (weight / (height * height)) * 703;
    }

    bmi = Math.round(bmi * 10) / 10;

    let status = "";
    if (bmi < 16) {
        status = "Severely Underweight";
    } else if (bmi < 18.5) {
        status = "Underweight";
    } else if (bmi < 25) {
        status = "Normal";
    } else if (bmi < 30) {
        status = "Overweight";
    } else if (bmi < 35) {
        status = "Obese Class I";
    } else if (bmi < 40) {
        status = "Obese Class II";
    } else {
        status = "Obese Class III";
    }

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("bmi-value").textContent = bmi;
    document.getElementById("bmi-status").textContent = status;

    // Move gauge indicator based on BMI (scale 10–50)
    const gauge = document.getElementById("bmi-gauge");
    const indicator = gauge.querySelector("::after");
    let pos = ((bmi - 10) / 40) * 100; // BMI 10–50 mapped to 0–100%
    pos = Math.max(0, Math.min(100, pos)); // clamp to [0,100]
    gauge.style.setProperty('--indicator-pos', `${pos}%`);
}

// Handle unit switching
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const unit = radio.value;
        const inputFields = document.getElementById("input-fields");
        inputFields.innerHTML = '';

        if (unit === "metric") {
            inputFields.innerHTML = `
                <input type="number" id="weight" placeholder="Weight (kg)" step="0.1">
                <input type="number" id="height" placeholder="Height (cm)" step="0.1">
            `;
        } else {
            inputFields.innerHTML = `
                <input type="number" id="weight" placeholder="Weight (lbs)" step="0.1">
                <input type="number" id="height" placeholder="Height (inches)" step="0.1">
            `;
        }
    });
});
