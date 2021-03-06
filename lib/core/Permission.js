"use strict";

const Permissions = require("../Constants").Permissions;

/**
* Represents a calculated permissions number
* @prop {Number} allow The allowed permissions number
* @prop {Number} deny The denied permissions number
* @prop {Object} json A JSON representation of the permissions number.
* If a permission key isn't there, it is not set by this permission.
* If a permission key is false, it is denied by the permission.
* If a permission key is true, it is allowed by the permission.
* i.e.:
* ```
* {
*   "readMessages": true,
*   "sendMessages": true,
*   "manageMessages": false
* }```
* In the above example, readMessages and sendMessages are allowed permissions, and manageMessages is denied. Everything else is not explicitly set.
* <a href="reference.html#permissions">A full list of permission nodes can be found on the docs reference page</a>
*/
class Permission {
    constructor(allow, deny) {
        this.allow = allow;
        this.deny = deny || 0;
    }

    get json() {
        if(!this._json) {
            this._json = {};
            for(var perm of Object.keys(Permissions)) {
                if(!perm.startsWith("all")) {
                    if(this.allow & Permissions[perm]) {
                        this._json[perm] = true;
                    } else if(this.deny & Permissions[perm]) {
                        this._json[perm] = false;
                    }
                }
            }
        }
        return this._json;
    }
}

module.exports = Permission;