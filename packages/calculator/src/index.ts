window.Webflow ||= [];
window.Webflow.push(() => {
  // Query the elements

  const form = document.querySelector<HTMLFormElement>('[fs-element="form"]');
  const resultBudget = document.querySelector('[fs-element="result-budget"]');
  const resultPlan = document.querySelector('[fs-element="result-plan"]');

  if (!form || !resultBudget || !resultPlan) return;

  // Listen for form submission events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the data
    const formData = new FormData(form);
    const amount = formData.get('amount');
    const interest = formData.get('interest');
    const term = formData.get('term');

    if (!amount || !interest || !term) return;

    // Perform calculations
    // I = P * r * T
    const totalInterest = Number(amount) * (Number(interest) / 100) * Number(term);
    const total = Number(amount) + totalInterest;
    const monthlyPayment = total / 12;

    //    NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
    // Display the results
    resultLoan.textContent = amount.toString();
    resultInterest.textContent = totalInterest.toFixed(2);
    resultTotal.textContent = total.toFixed(2);
    resultMonthly.textContent = monthlyPayment.toFixed(2);
  });
});
