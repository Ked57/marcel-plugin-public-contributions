class MarcelPluginPublicContributions extends Marcel.Plugin {
  constructor() {
    super()
    this.root = document.getElementById('root')
  }

  render() {
    const { firstName, stylesvar = {} } = this.props

    const response = await fetch("http://localhost:3000", {
      method: "GET",
      mode: "no-cors"
    });
    console.log(response);
    if(!response.ok){
      console.error("no response from server");
      return;
    }
    const usableData = [];
    for (key of Object.keys(data)) {
      usableData.push(data[key]);
      console.log("pushed ", data[key]);
    }
    console.log(usableData);
    const template = `
    <ul>${usableData.map(
      row =>
        `<li><img src=${row.avatarUrl}> ${row.name} ${row.count}</li>`
    )}
    </ul>`;
    console.log(template);
    this.root.innerText = template;

    // stylesvar is a special property containing the global media theme.
    // You should use it to have a consistent style accross all the media.
    if (stylesvar['primary-color']) this.root.style.color = stylesvar['primary-color']
    if (stylesvar['font-family']) this.root.style.fontFamily = stylesvar['font-family']
  }
}

Marcel.init(MarcelPluginPublicContributions)

// uncomment this line to try the plugin in a browser :
// Marcel.changeProps({ firstName: 'Marcel' })
