class MarcelPluginPublicContributions extends Marcel.Plugin {
  constructor() {
    super();
    this.root = document.getElementById("root");
  }

  async render() {
    const { firstName, stylesvar = {} } = this.props;

    const response = await fetch("http://localhost:3000", {
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
    const template = `
    <table>
      <thead>
        <tr>
          <th colspan="3">Public contributions at Zenika this month</th>
        </tr>
      </thead>
      <tbody>
        ${usableData.map(
          row =>
            `<tr>
              <td>
                <img class="thumbnail" src=${row.avatarUrl}>
              </td>
              <td>
                ${row.name}
              </td>
              <td>
                ${row.count}
              </td>
            </tr>`
        ).join("")}
      </tbody>
    </table>`;
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
// Marcel.changeProps({ firstName: 'Marcel' })
