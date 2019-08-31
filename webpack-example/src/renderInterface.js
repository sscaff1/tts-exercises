function renderInterface() {
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="add">
      <input type="number" />
      +
      <input type="number" />
      =
      <span class="sum"></span>
    </div>
  `;
  document.body.append(el);
}

export default renderInterface;
