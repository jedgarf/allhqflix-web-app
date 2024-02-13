require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
    var mySitemap = new Sitemap(router).build("https://allhqflix.com");

    for (let i = 0; i < mySitemap.sitemaps[0].urls.length; i++) {
        mySitemap.sitemaps[0].urls[i].changefreq =  'daily';
        mySitemap.sitemaps[0].urls[i].priority = 0.8;
    }
    
    mySitemap.save("./public/sitemap.xml");
  }
  
  generateSitemap();