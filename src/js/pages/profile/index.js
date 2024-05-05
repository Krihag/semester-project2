import "/src/css/input.css";

import init from "../../updates/init/index.js";
import userProfile from "../../components/userProfile/index.js";

const container = document.getElementById("root");

const data = await init();

if (!data) window.location.href = "/";

const profile = await userProfile(data);

container.append(profile);
