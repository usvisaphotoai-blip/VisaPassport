/** Inline PayPal badge (checkout-button colours) sized to sit next to the Razorpay badge (100×40). */
export default function PayPalBadge() {
  return (
    <a href="https://www.paypal.com/" target="_blank" rel="noopener noreferrer" aria-label="Payments powered by PayPal">
      <svg width="100" height="40" viewBox="0 0 100 40" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>PayPal</title>
        <rect width="100" height="40" rx="4" fill="#FFC439" />
        <text x="50" y="11" textAnchor="middle" fill="#253B80" fontSize="6.2" fontFamily="Helvetica, Arial, sans-serif">
          Payments Powered by
        </text>
        <text
          x="50"
          y="31"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fontStyle="italic"
          fontFamily="Verdana, Helvetica, Arial, sans-serif"
        >
          <tspan fill="#253B80">Pay</tspan>
          <tspan fill="#179BD7">Pal</tspan>
        </text>
      </svg>
    </a>
  );
}
