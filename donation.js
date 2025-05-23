// YADA-EXPERIENCE Donation Processing JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // One-time donation functionality
    const oneTimeDonationForm = document.getElementById('one-time-donation-form');
    const oneTimeAmounts = document.querySelectorAll('.one-time-donation .donation-amount');
    const oneTimeCustomInput = document.getElementById('one-time-custom-amount');
    const oneTimeDonateButton = document.getElementById('one-time-donate-button');
    let selectedOneTimeAmount = '100.00'; // Default amount

    // Monthly donation functionality
    const monthlyDonationForm = document.getElementById('monthly-donation-form');
    const monthlyAmounts = document.querySelectorAll('.monthly-donation .donation-amount');
    const monthlyCustomInput = document.getElementById('monthly-custom-amount');
    const monthlyDonateButton = document.getElementById('monthly-donate-button');
    let selectedMonthlyAmount = '25.00'; // Default amount

    // Handle one-time donation amount selection
    if (oneTimeAmounts) {
        oneTimeAmounts.forEach(function(amountDiv) {
            amountDiv.addEventListener('click', function() {
                // Remove active class from all amounts
                oneTimeAmounts.forEach(function(div) {
                    div.classList.remove('active');
                });
                
                // Add active class to selected amount
                this.classList.add('active');
                
                // Get the selected amount value
                const amountText = this.querySelector('.donation-amount-value').textContent;
                selectedOneTimeAmount = amountText.replace('$', '').trim();
                
                // Clear custom amount input
                if (oneTimeCustomInput) {
                    oneTimeCustomInput.value = '';
                }
            });
        });
    }

    // Handle monthly donation amount selection
    if (monthlyAmounts) {
        monthlyAmounts.forEach(function(amountDiv) {
            amountDiv.addEventListener('click', function() {
                // Remove active class from all amounts
                monthlyAmounts.forEach(function(div) {
                    div.classList.remove('active');
                });
                
                // Add active class to selected amount
                this.classList.add('active');
                
                // Get the selected amount value
                const amountText = this.querySelector('.donation-amount-value').textContent;
                selectedMonthlyAmount = amountText.replace('$', '').trim();
                
                // Clear custom amount input
                if (monthlyCustomInput) {
                    monthlyCustomInput.value = '';
                }
            });
        });
    }

    // Handle custom one-time amount input
    if (oneTimeCustomInput) {
        oneTimeCustomInput.addEventListener('input', function() {
            // Remove active class from all preset amounts
            oneTimeAmounts.forEach(function(div) {
                div.classList.remove('active');
            });
            
            // Set the selected amount to the custom input value
            if (this.value) {
                selectedOneTimeAmount = this.value;
            } else {
                // Default back to $100 if input is cleared
                selectedOneTimeAmount = '100.00';
                document.querySelector('.one-time-donation .donation-amount:nth-child(3)').classList.add('active');
            }
        });
    }

    // Handle custom monthly amount input
    if (monthlyCustomInput) {
        monthlyCustomInput.addEventListener('input', function() {
            // Remove active class from all preset amounts
            monthlyAmounts.forEach(function(div) {
                div.classList.remove('active');
            });
            
            // Set the selected amount to the custom input value
            if (this.value) {
                selectedMonthlyAmount = this.value;
            } else {
                // Default back to $25 if input is cleared
                selectedMonthlyAmount = '25.00';
                document.querySelector('.monthly-donation .donation-amount:nth-child(2)').classList.add('active');
            }
        });
    }

    // Handle one-time donation form submission
    if (oneTimeDonationForm) {
        oneTimeDonationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Set the amount in the PayPal form
            document.getElementById('one-time-amount').value = selectedOneTimeAmount;
            
            // Submit the PayPal form
            this.submit();
        });
    }

    // Handle monthly donation form submission
    if (monthlyDonationForm) {
        monthlyDonationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Set the amount in the PayPal form
            document.getElementById('monthly-amount').value = selectedMonthlyAmount;
            
            // Submit the PayPal form
            this.submit();
        });
    }
});
