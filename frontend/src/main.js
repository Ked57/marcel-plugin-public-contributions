class MarcelPluginPublicContributions extends Marcel.Plugin {
  constructor() {
    super();
    this.root = document.getElementById("root");
    this.interval = null;
  }

  autoScroll() {
    this.interval = setInterval(() => {
      window.scrollBy(0, 1);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(this.interval);
        window.scrollBy(0, -window.scrollY);
        setTimeout(() => this.autoScroll(), 5000);
      }
    }, 50);
  }

  async render() {
    const {
      backend_url,
      top_message,
      body_bg_color,
      body_txt_color,
      body_font,
      row_border_color,
      first_txt_color,
      stylesvar = {}
    } = this.props;

    document.body.style.backgroundColor = body_bg_color;
    document.body.style.color = body_txt_color;
    document.body.style.fontFamily = body_font;
    const rowElements = document.querySelectorAll(".row");
    for (let i = 0; i < rowElements.length; i++) {
      elements[i].style.borderTop = `1px solid ${row_border_color}`;
    }
    const firstElements = document.querySelectorAll(".first");
    for (let i = 0; i < firstElements.length; i++) {
      elements[i].style.color = first_txt_color;
    }

    const response = await fetch(backend_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response || !response.ok) {
      console.error("no response from server");
      return;
    }
    const data = await response.json();
    const usableData = [];
    for (key of Object.keys(data)) {
      usableData.push(data[key]);
    }
    const first = usableData.shift();
    const template = `
    <div class="container">
      <div class="header">
        ${top_message}
      </div>
      <div class="info-container">
        ${`<div class="row first">
            <div class="row-item"><img class="thumbnail" src=${first.avatarUrl}></div>
            <div class="row-item">${first.name}</div>
            <div class="row-item">${first.count}</div>
          </div>`}
        ${usableData
          .map(
            row =>
              `<div class="row">
              <div class="row-item"><img class="thumbnail" src=${row.avatarUrl}></div>
              <div class="row-item">${row.name}</div>
              <div class="row-item">${row.count}</div>
            </div>`
          )
          .join("")}
      </div>
    </div>`;
    this.root.innerHTML = template;

    setTimeout(() => this.autoScroll(), 5000);

    // stylesvar is a special property containing the global media theme.
    // You should use it to have a consistent style accross all the media.
    if (stylesvar["primary-color"])
      this.root.style.color = stylesvar["primary-color"];
    if (stylesvar["font-family"])
      this.root.style.fontFamily = stylesvar["font-family"];
  }
}

Marcel.init(MarcelPluginPublicContributions);

// uncomment this line to try the plugin in a browser :
Marcel.changeProps({
  backend_url: "http://localhost:8080",
  body_bg_color: "#f2f2f2",
  body_txt_color: "#4c4c4c",
  body_font: "Helvetica, Arial, sans-serif",
  row_border_color: "#d2d6d8",
  first_txt_color: "#b51432",
  top_message: "Public contributions of Zenika Members during hacktoberfest !"
});
