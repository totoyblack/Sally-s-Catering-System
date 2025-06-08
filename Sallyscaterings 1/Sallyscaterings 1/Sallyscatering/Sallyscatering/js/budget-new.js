// Budget management functionality
document.addEventListener('DOMContentLoaded', function() {
    const budgetInput = document.getElementById('budget');
    let initialBudget = 0;
    let currentBudget = 0;

    // Initialize budget when page loads
    if (budgetInput) {
        initialBudget = parseFloat(budgetInput.value) || 0;
        currentBudget = initialBudget;
    }

    // Function to update budget display
    function updateBudgetDisplay(newBudget) {
        currentBudget = newBudget;
        if (budgetInput) {
            budgetInput.value = newBudget.toFixed(2);
        }
    }

    // Function to calculate total cost of all addons
    function calculateTotalCost() {
        let totalCost = 0;
        
        // Calculate total cost of all selected addons
        document.querySelectorAll('.addon-quantity input').forEach(qtyInput => {
            const itemPriceElement = qtyInput.closest('.addon-card').querySelector('.addon-price');
            if (itemPriceElement) {
                // Extract price (e.g., from "₱1,500/set")
                const priceText = itemPriceElement.textContent.replace('₱', '').trim();
                const pricePerUnit = parseFloat(priceText.split('/')[0].replace(/,/g, ''));
                const quantity = parseInt(qtyInput.value) || 0;
                totalCost += pricePerUnit * quantity;
            }
        });

        return totalCost;
    }

    // Add event listeners to quantity input changes
    document.querySelectorAll('.addon-quantity input').forEach(input => {
        input.addEventListener('input', function() {
            const totalCost = calculateTotalCost();
            updateBudgetDisplay(initialBudget - totalCost);
        });
    });

    // Add event listeners to plus/minus buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.addon-quantity').querySelector('input');
            if (input) {
                const currentValue = parseInt(input.value) || 0;
                if (this.classList.contains('plus')) {
                    input.value = Math.min(currentValue + 1, parseInt(input.max));
                } else {
                    input.value = Math.max(currentValue - 1, parseInt(input.min));
                }
                // Trigger input event to update budget
                input.dispatchEvent(new Event('input'));
            }
        });
    });

    // Add budget validation
    function validateBudget() {
        if (currentBudget < 0) {
            alert('Budget cannot be negative! Please adjust your selections.');
            return false;
        }
        return true;
    }

    // Add validation to form submission
    const form = document.getElementById('budget-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateBudget()) {
                e.preventDefault();
            }
        });
    }
});
