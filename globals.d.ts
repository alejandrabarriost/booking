// You may need the next line in some situations

import { Session } from "@booking/config/session";
import * as IronSession from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user: Session["user"];
  }
}
