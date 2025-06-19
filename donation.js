// Donation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle amount button selection
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentNode.querySelectorAll('.amount-btn').forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Clear custom amount input
            const customInput = this.parentNode.parentNode.querySelector('.custom-amount');
            if (customInput) {
                customInput.value = '';
            }
        });
    });

    // Handle custom amount input
    document.querySelectorAll('.custom-amount').forEach(input => {
        input.addEventListener('input', function() {
            // Remove active class from amount buttons
            this.parentNode.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    });
});

// PayPal donation processing
function processPayPalDonation() {
    const activeBtn = document.querySelector('.donation-card:nth-child(1) .amount-btn.active');
    const customAmount = document.querySelector('.donation-card:nth-child(1) .custom-amount').value;
    const donationType = document.querySelector('input[name="paypal-type"]:checked').value;
    
    let amount = activeBtn ? activeBtn.dataset.amount : customAmount;
    
    if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount.');
        return;
    }
    
    // In a real implementation, you would integrate with PayPal's API
    // For now, we'll show a confirmation message
    const message = `Thank you for your ${donationType} donation of $${amount}! You will be redirected to PayPal to complete your donation.`;
    alert(message);
    
    // Here you would redirect to PayPal or open PayPal checkout
    // window.location.href = `https://www.paypal.com/donate?business=yadaexperience19@gmail.com&amount=${amount}&currency_code=USD`;
}

// MTN Mobile Money donation processing
function processMTNDonation() {
    const activeBtn = document.querySelector('.donation-card:nth-child(2) .amount-btn.active');
    const customAmount = document.querySelector('.donation-card:nth-child(2) .custom-amount').value;
    const donationType = document.querySelector('input[name="mtn-type"]:checked').value;
    
    let amount = activeBtn ? activeBtn.dataset.amount : customAmount;
    
    if (!amount || amount < 1000) {
        alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
        return;
    }
    
    // Show MTN Mobile Money instructions
    const message = `To complete your ${donationType} donation of UGX ${amount.toLocaleString()}:

1. Dial *165# on your MTN phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${amount}
5. Enter your PIN to confirm
6. Send us a WhatsApp message at +256 783 501 007 with your transaction details

Thank you for supporting YADA-EXPERIENCE!`;
    
    alert(message);
    
    // Optionally open WhatsApp
    // window.open(`https://wa.me/256783501007?text=MTN Mobile Money donation of UGX ${amount.toLocaleString()} completed. Transaction ID: [Please enter your transaction ID]`);
}

// Airtel Money donation processing
function processAirtelDonation() {
    const activeBtn = document.querySelector('.donation-card:nth-child(3) .amount-btn.active');
    const customAmount = document.querySelector('.donation-card:nth-child(3) .custom-amount').value;
    const donationType = document.querySelector('input[name="airtel-type"]:checked').value;
    
    let amount = activeBtn ? activeBtn.dataset.amount : customAmount;
    
    if (!amount || amount < 1000) {
        alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
        return;
    }
    
    // Show Airtel Money instructions
    const message = `To complete your ${donationType} donation of UGX ${amount.toLocaleString()}:

1. Dial *185# on your Airtel phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${amount}
5. Enter your PIN to confirm
6. Send us a WhatsApp message at +256 783 501 007 with your transaction details

Thank you for supporting YADA-EXPERIENCE!`;
    
    alert(message);
    
    // Optionally open WhatsApp
    // window.open(`https://wa.me/256783501007?text=Airtel Money donation of UGX ${amount.toLocaleString()} completed. Transaction ID: [Please enter your transaction ID]`);
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update amount displays in real-time
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.custom-amount').forEach(input => {
        input.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value && value > 0) {
                // You could update a display element here if needed
                console.log(`Custom amount entered: ${formatNumber(value)}`);
            }
        });
    });
});

