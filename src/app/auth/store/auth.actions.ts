import { Action } from "@ngrx/store";

export const TRY_SIGNUP = "TRY_SIGNUP";
export const TRY_SIGNIN = "TRY_SIGNIN";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export class TrySignup {
    readonly type = TRY_SIGNUP;
    constructor(public payload: { email: string, password: string }) { }
}

export class TrySignin {
    readonly type = TRY_SIGNIN;
    constructor(public payload: { email: string, password: string }) { }
}

export class Signup implements Action {
    readonly type = SIGNUP;
}
export class Signin implements Action {
    readonly type = SIGNIN;
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: String) { }
}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin; 