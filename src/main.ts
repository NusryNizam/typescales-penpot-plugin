// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});

function generateTypeScale(fontSize, scale, steps, negativeSteps) {
  const sizes = [];

  // Generate sizes below base
  for (let i = negativeSteps; i > 0; i--) {
    sizes.push({
      fontSize: +(fontSize / Math.pow(scale, i)).toFixed(1),
    });
  }

  // Add base size
  sizes.push({ fontSize: fontSize });

  // Generate sizes above base
  for (let i = 1; i <= steps; i++) {
    sizes.push({
      fontSize: +(fontSize * Math.pow(scale, i)).toFixed(1),
    });
  }

  return sizes;
}

// State management
let state = {
  fontSize: 16,
  scale: 1.067,
  steps: 2,
  negativeSteps: 1,
  typeScales: [],
};

// DOM Elements
const form = document.getElementById("typescale-form");
const fontSizeInput = document.getElementById("font-size");
const scaleSelect = document.getElementById("scale"); // Renamed to better reflect it's a select
const stepsInput = document.getElementById("steps");
const stepsBelowInput = document.getElementById("steps-below");
const typeScaleContainer = document.getElementById("typescale-container");

// Event Handlers
function updateTypeScale() {
  if (
    state.fontSize > 0 &&
    state.scale > 0 &&
    state.steps > 0 &&
    state.negativeSteps > 0
  ) {
    state.typeScales = generateTypeScale(
      state.fontSize,
      state.scale,
      state.steps,
      state.negativeSteps
    ).reverse();
    renderTypeScale();
  }
}

function renderTypeScale() {
  typeScaleContainer.innerHTML = state.typeScales
    .map(
      (item) => `
          <div>
              <div class="info caption">Font Size: ${item.fontSize}px 
              ${
                item.fontSize === state.fontSize
                  ? "<span class='base-font'>Base Font</span>"
                  : ""
              }
              </div>
              <div class="typescale" style="
                  font-size: ${item.fontSize}px;
                  line-height: 1.2;">
                  The quick brown fox jumps over the lazy dog.
              </div>
          </div>
      `
    )
    .join("");
}

// Event Listeners
fontSizeInput.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  if (value) {
    if (value < 0) value = 16;
    if (value > 1000) value = 1000;
    state.fontSize = value;
    updateTypeScale();
  }
});

scaleSelect.addEventListener("change", (e) => {
  state.scale = Number(e.target.value);
  updateTypeScale();
});

stepsInput.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  if (value) {
    if (value > 20) value = 20;
    if (value < 2) value = 2;
    state.steps = value;
    updateTypeScale();
  }
});

stepsBelowInput.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  if (value) {
    if (value > 5) value = 5;
    if (value < 1) value = 1;
    state.negativeSteps = value;
    updateTypeScale();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Generated type scale:", state.typeScales);
});

// Initial render
updateTypeScale();
