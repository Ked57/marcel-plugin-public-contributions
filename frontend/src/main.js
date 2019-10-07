class MarcelPluginPublicContributions extends Marcel.Plugin {
  constructor() {
    super();
    this.root = document.getElementById("root");
  }

  async render() {
    const { backend_url, stylesvar = {} } = this.props;

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
        Public contributions at Zenika this month
      </div>
      <div class="info-container">
        ${`<div class="row first">
        <div class="row-item"><img class="thumbnail" src=${first.avatarUrl}></div>
        <div class="row-item">${first.name}</div>
        <div class="row-item">${first.count}</div>
      </div>`}
        ${usableData.map(
          row =>
            `<div class="row">
              <div class="row-item"><img class="thumbnail" src=${row.avatarUrl}></div>
              <div class="row-item">${row.name}</div>
              <div class="row-item">${row.count}</div>
            </div>`
        ).join("")}
      </div>
    </div>`;
    this.root.innerHTML = template;

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
// Marcel.changeProps({ backend_url: "http://localhost:8080" })
