function renderWorks(container, category, baseUrl) {
  const base = baseUrl || '';
  let data = worksData;

  if (category && category !== 'all') {
    data = data.filter(item => item.category === category);
  }

  data.sort((a, b) => b.date.localeCompare(a.date));

  const leftCards = [];
  const rightCards = [];

  data.forEach((item, i) => {
    let mediaHtml = '';
    if (item.audio) {
      if (item.audio.endsWith('.mp4')) {
        mediaHtml = `<video controls><source src="${item.audio}" type="video/mp4"></video>`;
      } else {
        mediaHtml = `<audio controls><source src="${item.audio}" type="audio/mpeg"></audio>`;
      }
    }
    if (item.video) {
      mediaHtml = `<video controls><source src="${item.video}" type="video/mp4"></video>`;
    }

    let footerRight = '';
    if (item.fullTextUrl) {
      footerRight = `<a href="${base}${item.fullTextUrl}" class="card-read-more">阅读全文 →</a>`;
    }

    const card = `
      <div class="card" style="order:${i}">
        <div class="card-date">${item.date}</div>
        <h3 class="card-title">${item.title}</h3>
        <div class="card-body">${item.body}</div>
        ${mediaHtml}
        <div class="card-footer">
          <span class="card-tag">${item.categoryLabel}</span>
          ${footerRight}
        </div>
      </div>
    `;

    if (i % 2 === 0) {
      leftCards.push(card);
    } else {
      rightCards.push(card);
    }
  });

  container.innerHTML = `
    <div class="masonry-col">${leftCards.join('')}</div>
    <div class="masonry-col">${rightCards.join('')}</div>
  `;
}
