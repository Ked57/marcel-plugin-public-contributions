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

  async fetchData(backend_url) {
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
    return await response.json();
  }

  computeTemplate(data, top_message) {
    const usableData = [];
    for (key of Object.keys(data)) {
      usableData.push(data[key]);
    }
    const first = usableData.shift();
    return `
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

    this.root.innerHTML = this.computeTemplate(
      await this.fetchData(backend_url),
      top_message
    );

    document.body.style.backgroundColor = body_bg_color;
    document.body.style.color = body_txt_color;
    document.body.style.fontFamily = body_font;
    const headerElements = document.querySelectorAll(".header");
    for (element of headerElements) {
      element.style.borderBottom = `1px solid ${row_border_color}`;
      element.style.backgroundColor = body_bg_color;
      element.style.color = body_txt_color;
    }
    const rowElements = document.querySelectorAll(".row");
    for (element of rowElements) {
      element.style.borderTop = `1px solid ${row_border_color}`;
    }
    const firstElements = document.querySelectorAll(".first");
    for (element of firstElements) {
      element.style.color = first_txt_color;
    }

    setTimeout(() => this.autoScroll(), 5000);

    setInterval(async () => {
      this.root.innerHTML = this.computeTemplate(
        await this.fetchData(backend_url),
        top_message
      );
      console.log("Fetched updated data");
    }, 3600000);

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
