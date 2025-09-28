/**
 * Scrolls to an element by CSS selector with smooth behavior
 * @param selector - CSS selector string (e.g., '#projects', '.section', '[data-id="contact"]')
 * @param behavior - Scroll behavior, defaults to 'smooth'
 * @param block - Vertical alignment, defaults to 'start'
 * @param inline - Horizontal alignment, defaults to 'nearest'
 */
export function scrollToBySelector(
  selector: string,
  behavior: ScrollBehavior = 'smooth',
  block: ScrollLogicalPosition = 'start',
  inline: ScrollLogicalPosition = 'nearest'
): void {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ 
      behavior, 
      block, 
      inline 
    });
  } else {
    console.warn(`Element with selector "${selector}" not found`);
  }
}
