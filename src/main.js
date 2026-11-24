const dialog = document.querySelector(".cv-dialog");
const openButton = document.querySelector("[data-open-cv]");
const closeButtons = document.querySelectorAll("[data-close-cv]");

openButton?.addEventListener("click", () => dialog?.showModal());
closeButtons.forEach((button) => {
  button.addEventListener("click", () => dialog?.close());
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const chartLine = document.querySelector("[data-chart-line]");
const chartArea = document.querySelector("[data-chart-area]");
const chartPoints = [...document.querySelectorAll("[data-chart-points] circle")];
const chartWidth = 300;
const chartFloor = 105;
let chartTimer;

const updateChart = () => {
  const values = chartPoints.map(() => 20 + Math.round(Math.random() * 72));
  const coordinates = values.map((value, index) => ({
    x: (chartWidth / (values.length - 1)) * index,
    y: chartFloor - value,
  }));
  const linePath = coordinates
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartWidth} ${chartFloor} L 0 ${chartFloor} Z`;

  chartLine?.setAttribute("d", linePath);
  chartArea?.setAttribute("d", areaPath);
  chartPoints.forEach((point, index) => {
    point.setAttribute("cy", coordinates[index].y);
  });

  chartLine?.classList.remove("is-drawing");
  void chartLine?.getBoundingClientRect();
  chartLine?.classList.add("is-drawing");
};

const startChart = () => {
  if (chartTimer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  updateChart();
  chartTimer = window.setInterval(updateChart, 2600);
};

const stopChart = () => {
  window.clearInterval(chartTimer);
  chartTimer = undefined;
};

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopChart();
  else startChart();
});

startChart();
