function openMailClient() {
    // Simulate mailto behavior using JavaScript
    const email = 'xy@gmail.com';
    const subject = 'Odjava šolske malice';
    
    // Construct the mailto URL
    const sendData = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
    // Open the mail client
    window.location.href = sendData;
}