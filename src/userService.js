import React, { useEffect, useState } from "react";
import config from "./config/index"

export class UserService {
    static async get() {
        try {
            const res = await fetch(config.apiUrl + `/user/me`, {
                method: "GET",
                credentials: "include"
            });
            if (res.status === 403) {
                return null;
            }
            
            const user = await res.json();
            console.log(user);
            return user;
        } catch (e) {
            return null;
        }
    }

};