
const processedEmails = new Set();

function extractEmailFromRow(button) {
  const row = button.closest("tr");
  const emailDiv = row?.querySelector("div.rc");
  return emailDiv?.textContent.trim() || null;
}

function clickNext(retries = 10) {
  const buttons = Array.from(document.querySelectorAll('span.rP.sA'));

  for (const btn of buttons) {
    const email = extractEmailFromRow(btn);
    if (email && !processedEmails.has(email)) {
      console.log(`📩 Clicking: ${email}`);
      processedEmails.add(email);

      btn.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));

      setTimeout(() => clickNext(), 3000);
      return;
    }
  }

  if (retries > 0) {
    console.log("🔁 Retrying...");
    setTimeout(() => clickNext(retries - 1), 1000);
  } else {
    console.log("✅ Finished checking all accounts.");
  }
}

console.log("🚀 Triggered by extension. Starting mail fetch...");
setTimeout(() => clickNext(), 2000);
