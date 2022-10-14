window.Webflow ||= [];
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector<HTMLFormElement>('[fs-element="form"]');
  const resultLoan = document.querySelector('[fs-element="result-loan"]');
  const resultInterest = document.querySelector('[fs-element="result-interest"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  if (!form || !resultLoan || !resultInterest || !resultTotal || !resultMonthly) return;

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

    // Display the results
    resultLoan.textContent = amount.toString();
    resultInterest.textContent = totalInterest.toString();
    resultTotal.textContent = total.toString();
    resultMonthly.textContent = monthlyPayment.toString();
  });
});
