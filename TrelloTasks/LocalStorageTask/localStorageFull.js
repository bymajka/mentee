export default function isLocalStorageFull() {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return false;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 || e.name === "QuotaExceededError")
    );
  }
}
