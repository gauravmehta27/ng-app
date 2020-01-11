import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { catchError, take } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class AppConfigService {
  public static readonly configPath = "config/config.json";
  public config: Object = null;

  constructor(private http: HttpClient) {}

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig() {
    return this.config;
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   *  for more https://juristr.com/blog/2018/01/ng-app-runtime-config/
   */
  public load() {
    return new Promise((resolve, reject) => {
      if (sessionStorage[AppConfigService.configPath]) {
        this.config = JSON.parse(sessionStorage[AppConfigService.configPath]);
        resolve(true);
        return;
      }
      this.http
      .get(AppConfigService.configPath).pipe(take(1), catchError(err => Observable.throw(err || 'Server error') ))
        .subscribe((configResponse: any) => {
          sessionStorage[AppConfigService.configPath] = JSON.stringify(configResponse);
          this.config = configResponse;
          resolve(true);
        });
    });
  }
}
