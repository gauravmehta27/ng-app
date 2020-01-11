import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { AppConfigService } from "./app/core/services/app-config.service";

if (environment.production) {
  enableProdMode();
}

function bootstrapApp() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
  // We bootstraping app from browser, we need fetch config.json.

  const req = new XMLHttpRequest();
  req.addEventListener("error", (res: any) => {
    console.log("Error: ", res);
  });
  req.addEventListener("load", (res: any) => {
    try {
      // try to parse it here -- any bad syntax should prevent app from bootstrapping.
      const response = JSON.parse(res.currentTarget.response);
      // save it in session to avoid re-fetching it once angular loads
      sessionStorage[AppConfigService.configPath] = JSON.stringify(response);
      bootstrapApp();
    } catch (error) {
      console.warn("caught when bootstrapping app");
      console.error(error);
    }
  });
  req.open("GET", "config/config.json");
  req.send(null);
});
