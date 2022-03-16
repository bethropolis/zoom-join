const app = new Vue({
  el: "#root",
  data: {
    id: null,
    page: 1,
    insert: localStorage.getItem("class") || false,
    message: "you",
    url: "https://ickyminiatureprofiles.bethropolis.repl.co/",
    notify: false,
    classy: localStorage.getItem("class") || "",
    links: JSON.parse(localStorage.getItem("links")) || {},
    table: localStorage.getItem("table") || `img/timetable.jpeg`,
    settings: JSON.parse(localStorage.getItem("set")) || {},
    notification: localStorage.getItem("notify") || {},
    online: navigator.onLine,
  },
  methods: {
    getNotification: function () {
      let start = this.notification.length || 0;
      $.get(
        this.url +
          "notify?i=" +
          this.id +
          "&class=" +
          this.classy.toUpperCase(),
        (data) => {
          if (data.bell) {
            this.notify = true;
            this.store("note", data.id);
            var parser = new DOMParser();
            var doc = parser.parseFromString(data.text, "text/html");
            html_data = doc.body;
            $("#notify").html(html_data);
            this.store("notify", html_data.innerHTML);
          }
        }
      );
    },
    generate: function () {
      let id = Math.random().toString(36).substring(2, 7);
      this.store("id", id); 
      return id;
    },
    store: function (a, b) {
      localStorage.setItem(a, b);
    },
    updateClass: function (cl) { 
      this.insert= this.classy;
      this.store("class", this.classy); 
    },
    updateTable: function (cl) {
      let id = this.classy|| cl;
      this.store("table", id);
    },

    getLinks: function (cl) {
      let url = this.url + "?class=" + cl.toUpperCase();
      $.get(url, (data) => { 
        if(data.length){ 
        this.links = data;
        this.store("links", JSON.stringify(data));
        }else{
          $(".pg-1").html('<h2>your class is currently not supported, please contact developer.</h2>') 
        }
      });
    },
  },
  mounted: function () {
    this.id = localStorage.getItem("id") || this.generate();
    if(this.notification) $("#notify").html(this.notification);
    if (this.online) this.getNotification();
    if (this.classy && this.online) this.getLinks(this.classy);
  },
});
