export function openBookingModal(packageName: string = 'All-Inclusive Stay Package') {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('open-booking-modal', {
      detail: { packageName },
    });
    window.dispatchEvent(event);
  }
}
