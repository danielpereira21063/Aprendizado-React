import { api, requestConfig } from "../utils/config";

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((error) => {
                console.log(error);
            });

        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register
}

export default authService;