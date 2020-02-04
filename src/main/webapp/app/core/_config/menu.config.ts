export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: []
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Menu', // <= Title of the page
          desc: 'Resource config for menu', // <= Description of the page
          root: true,
          page: '/menu', // <= URL
          icon: 'flaticon-line-graph' // <= Choose the icon class
        },
        {
          title: 'Zone', // <= Title of the page
          desc: 'Resource config for zone', // <= Description of the page
          root: true,
          page: '/zone', // <= URL
          icon: 'flaticon-line-graph' // <= Choose the icon class
        }
      ]
    }
  };

  public get configs(): any {
    return this.defaults;
  }
}
