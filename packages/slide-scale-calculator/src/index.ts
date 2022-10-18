window.Webflow ||= [];
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector<HTMLFormElement>('[fs-element="form"]');
  const resultBudget = document.querySelector('[fs-element="result-budget"]');
  const resultPlan = document.querySelector('[fs-element="result-plan"]');

  // Set up currency display
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  // TODO: Need to set up calculations for final price

  if (!form || !resultBudget || !resultPlan) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the data
    const formData = new FormData(form);

    const operatingBudget = formData.get('operatingBudget');
    const pricePlan = formData.get('pricePlan');

    if (!operatingBudget || !pricePlan) return;

    const totalOperatingBudget = currencyFormat.format(Number(operatingBudget));
    const totalPricePlan = String(pricePlan);

    // Display the results
    resultBudget.textContent = totalOperatingBudget.toString();
    resultPlan.textContent = totalPricePlan.toString();
  });
});
